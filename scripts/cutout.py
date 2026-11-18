#!/usr/bin/env python3
"""
Sticker pipeline for Debugg and Slay Week.
Processes raw photos into die-cut stickers with white border and ink outline.
"""

import os
import sys
import argparse
from pathlib import Path
from rembg import remove, new_session
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
from scipy import ndimage
from skimage.measure import label, regionprops
from tqdm import tqdm

# Configuration
RAW_DIR = Path("assets/raw")
CUTOUT_DIR = Path("build/cutouts")
STICKER_DIR = Path("public/stickers")
CONTACT_DIR = Path("build/contact_sheets")
BORDER_PERCENT = 0.03  # 3% of height
OUTLINE_WIDTH = 3
OUTLINE_COLOR = (17, 17, 17, 255)  # #111
THRESHOLD = 40
MAX_FILE_SIZE_KB = 180
WEBP_QUALITY = 92

# Models to try in order (birefnet-general is very slow on CPU, use isnet with alpha_matting by default)
MODELS = [
    "isnet-general-use",
]

# Theme folder mapping
THEMES = {
    "career": "careerwear",
    "streetwear-y2k": "streetwear-y2k",
    "jersey-sportswear": "sportwear-jersey",
    "schoolwear": "schoolwear",
    "cultural": "culturalwear",
}

def ensure_dirs():
    for d in [CUTOUT_DIR, STICKER_DIR, CONTACT_DIR]:
        for theme in THEMES.values():
            (d / theme).mkdir(parents=True, exist_ok=True)

def get_largest_component(alpha: np.ndarray) -> np.ndarray:
    """Keep only the largest connected component above threshold."""
    binary = (alpha > THRESHOLD).astype(np.uint8)
    labeled = label(binary, connectivity=2)
    if labeled.max() == 0:
        return binary
    regions = regionprops(labeled)
    largest = max(regions, key=lambda r: r.area)
    mask = (labeled == largest.label).astype(np.uint8)
    return mask

def crop_to_bbox(image: Image.Image, mask: np.ndarray) -> Image.Image:
    """Crop image to the bounding box of the mask."""
    rows = np.any(mask, axis=1)
    cols = np.any(mask, axis=0)
    if not rows.any() or not cols.any():
        return image
    rmin, rmax = np.where(rows)[0][[0, -1]]
    cmin, cmax = np.where(cols)[0][[0, -1]]
    return image.crop((cmin, rmin, cmax + 1, rmax + 1))

def create_die_cut(image: Image.Image) -> Image.Image:
    """
    Add white border (3% of height) and 3px ink outline.
    Border follows the shape using distance transform.
    Canvas is padded first so borders wrap all sides.
    """
    # Ensure RGBA
    if image.mode != "RGBA":
        image = image.convert("RGBA")
    
    arr = np.array(image)
    alpha = arr[:, :, 3]
    
    h = image.height
    border_px = max(1, int(h * BORDER_PERCENT))
    outline_px = OUTLINE_WIDTH
    pad = border_px + outline_px + 2  # Extra padding for safety
    
    # Pad the canvas on all sides
    padded_arr = np.pad(arr, ((pad, pad), (pad, pad), (0, 0)), mode='constant', constant_values=0)
    padded_alpha = padded_arr[:, :, 3]
    
    # Distance transform from the edge of the subject
    binary = (padded_alpha > 0).astype(np.uint8)
    dist = ndimage.distance_transform_edt(1 - binary)
    
    # Create new alpha: subject + border + outline
    new_alpha = np.zeros_like(padded_alpha, dtype=np.uint8)
    
    # Subject (original alpha)
    new_alpha = np.maximum(new_alpha, padded_alpha)
    
    # White border: distance <= border_px
    border_mask = (dist <= border_px) & (dist > 0)
    new_alpha[border_mask] = 255
    
    # Ink outline: border_px < distance <= border_px + outline_px
    outline_mask = (dist > border_px) & (dist <= border_px + outline_px)
    new_alpha[outline_mask] = 255
    
    # Build output image
    out = np.zeros_like(padded_arr, dtype=np.uint8)
    
    # Fill subject with original colors
    subject_mask = padded_alpha > 0
    out[subject_mask] = padded_arr[subject_mask]
    
    # Fill border with white
    out[border_mask] = [255, 255, 255, 255]
    
    # Fill outline with ink color
    out[outline_mask] = OUTLINE_COLOR
    
    return Image.fromarray(out, "RGBA")

def process_image(input_path: Path, output_cutout: Path, output_sticker: Path, session, attempt: int = 1) -> tuple:
    """Process a single image through the pipeline. Returns (sticker, success, message)."""
    # Load
    img = Image.open(input_path).convert("RGBA")
    original_size = img.size
    
    # Try models in order
    result = None
    last_error = None
    
    for model_name in MODELS:
        try:
            # Always use alpha matting for isnet-general-use for better edges
            use_matting = (model_name == "isnet-general-use")
            if use_matting and model_name == "isnet-general-use":
                result = remove(img, session=session, alpha_matting=True,
                                alpha_matting_foreground_threshold=240,
                                alpha_matting_background_threshold=10,
                                alpha_matting_erode_size=5)
            else:
                result = remove(img, session=session)
            result = result.convert("RGBA")
            break
        except Exception as e:
            last_error = e
            continue
    
    if result is None:
        return None, False, f"All models failed: {last_error}"
    
    # Keep only largest component
    alpha = np.array(result)[:, :, 3]
    mask = get_largest_component(alpha)
    
    # Apply mask
    result_arr = np.array(result)
    result_arr[:, :, 3] = mask * 255
    result = Image.fromarray(result_arr, "RGBA")
    
    # Crop to bounding box
    result = crop_to_bbox(result, mask)
    
    # Save plain cutout (at full resolution)
    result.save(output_cutout, "PNG")
    
    # Create die-cut sticker
    sticker = create_die_cut(result)
    
    # Save sticker as WebP at full resolution, adaptive quality to stay under MAX_FILE_SIZE_KB
    quality = WEBP_QUALITY
    while quality >= 70:
        sticker.save(output_sticker, "WEBP", quality=quality, method=6)
        size_kb = output_sticker.stat().st_size / 1024
        if size_kb <= MAX_FILE_SIZE_KB:
            return sticker, True, f"OK ({sticker.width}x{sticker.height}, {size_kb:.0f}KB, q{quality})"
        quality -= 5
    
    # If still too large at minimum quality, return failure
    size_kb = output_sticker.stat().st_size / 1024
    return sticker, False, f"File size {size_kb:.0f}KB > {MAX_FILE_SIZE_KB}KB even at q{quality+5}"

def build_contact_sheet(theme: str, stickers: list, output_path: Path, raw_files: list):
    """Build a contact sheet on magenta background with labels showing raw filenames."""
    if not stickers:
        return
    
    # Magenta background
    bg_color = (255, 0, 255, 255)
    
    # Layout: 3x3 grid
    cols, rows = 3, 3
    thumb_w = max(s.width for s in stickers)
    thumb_h = max(s.height for s in stickers)
    padding = 20
    
    sheet_w = cols * thumb_w + (cols + 1) * padding
    sheet_h = rows * thumb_h + (rows + 1) * padding + 60  # Extra space for filename labels
    
    sheet = Image.new("RGBA", (sheet_w, sheet_h), bg_color)
    draw = ImageDraw.Draw(sheet)
    
    for idx, sticker in enumerate(stickers):
        r = idx // cols
        c = idx % cols
        x = padding + c * (thumb_w + padding) + (thumb_w - sticker.width) // 2
        y = padding + r * (thumb_h + padding) + (thumb_h - sticker.height) // 2
        sheet.paste(sticker, (x, y), sticker)
        
        # Label: sticker number
        draw.text((x + 5, y + 5), f"s{idx+1:02d}", fill=(0, 0, 0, 255))
        
        # Filename label below sticker
        if idx < len(raw_files):
            fname = raw_files[idx]
            # Truncate long filenames
            label_text = fname[:40] + ("..." if len(fname) > 40 else "")
            label_y = y + thumb_h + 5
            draw.text((x + 5, label_y), label_text, fill=(0, 0, 0, 255))
    
    sheet.save(output_path, "PNG")

def find_raw_file(theme_folder: str, sticker_num: int) -> Path:
    """Find the raw file corresponding to a sticker number."""
    raw_theme_dir = RAW_DIR / theme_folder
    images = sorted(raw_theme_dir.glob("*.jpeg")) + sorted(raw_theme_dir.glob("*.jpg")) + sorted(raw_theme_dir.glob("*.png"))
    if 0 <= sticker_num - 1 < len(images):
        return images[sticker_num - 1]
    return None

def main():
    parser = argparse.ArgumentParser(description="Sticker cutout pipeline")
    parser.add_argument("--only", type=str, help="Process only a specific theme:sticker (e.g., schoolwear:s07)")
    parser.add_argument("--retry-failed", action="store_true", help="Retry previously failed stickers with alpha matting")
    args = parser.parse_args()
    
    ensure_dirs()
    
    all_problems = []
    mapping_report = []
    
    # Parse --only argument
    only_theme = None
    only_sticker = None
    if args.only:
        if ":" in args.only:
            try:
                only_theme, only_sticker_str = args.only.split(":")
                only_sticker = int(only_sticker_str.replace("s", "").replace("S", ""))
            except ValueError:
                print("ERROR: --only format must be theme:sticker (e.g., schoolwear:s07)")
                sys.exit(1)
        else:
            only_theme = args.only
    
    for theme_key, theme_folder in THEMES.items():
        # Skip themes not requested by --only
        if only_theme and only_theme != theme_folder:
            continue
            
        print(f"\n=== Processing {theme_key} -> {theme_folder} ===")
        
        raw_theme_dir = RAW_DIR / theme_folder
        if not raw_theme_dir.exists():
            print(f"  WARNING: {raw_theme_dir} does not exist")
            continue
        
        images = sorted(raw_theme_dir.glob("*.jpeg")) + sorted(raw_theme_dir.glob("*.jpg")) + sorted(raw_theme_dir.glob("*.png"))
        
        if len(images) != 9:
            print(f"  WARNING: Expected 9 images, found {len(images)} in {theme_folder}")
        
        stickers = []
        cutout_dir = CUTOUT_DIR / theme_folder
        sticker_dir = STICKER_DIR / theme_folder
        raw_files = [img.name for img in images[:9]]
        
        # Create session once per theme
        session = new_session(MODELS[0])
        
        # Determine which stickers to process
        sticker_indices = range(9)
        if only_theme and only_theme == theme_folder and only_sticker:
            sticker_indices = [only_sticker - 1]
            print(f"  Only processing s{only_sticker:02d}")
        
        for i in sticker_indices:
            if i >= len(images):
                continue
            img_path = images[i]
            print(f"  Processing {img_path.name} -> s{i+1:02d}...")
            try:
                cutout_path = cutout_dir / f"s{i+1:02d}.png"
                sticker_path = sticker_dir / f"s{i+1:02d}.webp"
                
                # First attempt
                sticker, success, msg = process_image(img_path, cutout_path, sticker_path, session, attempt=1)
                
                # If failed and not --only, try second attempt
                if not success and not args.only:
                    print(f"    Attempt 1 failed: {msg}. Retrying...")
                    sticker, success, msg = process_image(img_path, cutout_path, sticker_path, session, attempt=2)
                
                if success:
                    stickers.append(sticker)
                    print(f"    Saved: {sticker_path.name} ({sticker.width}x{sticker.height}, {msg})")
                    mapping_report.append(f"{theme_folder}/s{i+1:02d}.webp <- {img_path.name}")
                else:
                    print(f"    FAILED: {msg}")
                    all_problems.append(f"{theme_folder}/s{i+1:02d}: {msg} (raw: {img_path.name})")
                    # Add placeholder to keep indices aligned
                    stickers.append(None)
                    
            except Exception as e:
                print(f"    ERROR: {e}")
                all_problems.append(f"{theme_folder}/s{i+1:02d}: {e} (raw: {img_path.name})")
                stickers.append(None)
        
        # Build contact sheet (only with successful stickers)
        valid_stickers = [s for s in stickers if s is not None]
        if valid_stickers:
            contact_path = CONTACT_DIR / f"{theme_folder}_contact.png"
            build_contact_sheet(theme_folder, valid_stickers, contact_path, raw_files)
            print(f"  Contact sheet: {contact_path}")
    
    print("\n=== MAPPING REPORT ===")
    for line in mapping_report:
        print(f"  {line}")
    
    print("\n=== PROBLEMS FOUND ===")
    if all_problems:
        for p in all_problems:
            print(f"  - {p}")
    else:
        print("  None!")
    
    # Save problems report
    report_path = CONTACT_DIR / "problems.txt"
    report_path.write_text("\n".join(all_problems) if all_problems else "No problems found.")
    print(f"\nReport saved to {report_path}")
    
    # Save mapping report
    mapping_path = CONTACT_DIR / "mapping.txt"
    mapping_path.write_text("\n".join(mapping_report))
    print(f"Mapping saved to {mapping_path}")

if __name__ == "__main__":
    main()