import os
import glob
import json
import shutil
import zipfile
import re

ROOT_DIR = os.path.abspath("e:/tutorial/founderdada")
TEMPLATES_DIR = os.path.join(ROOT_DIR, "src", "templates")
PUBLIC_TEMPLATES_DIR = os.path.join(ROOT_DIR, "public", "templates")
PUBLIC_DOWNLOADS_DIR = os.path.join(ROOT_DIR, "public", "downloads")

os.makedirs(TEMPLATES_DIR, exist_ok=True)
os.makedirs(PUBLIC_TEMPLATES_DIR, exist_ok=True)
os.makedirs(PUBLIC_DOWNLOADS_DIR, exist_ok=True)

CUSTOM_SLUGS = {
    "agenwrite---geo-infrastructure.zip": "agenwrite-geo",
    "ai-web-design-agency.zip": "ai-agency",
    "background-on-hover-patterns.zip": "magnetic-grid",
    "clearnotes-hero.zip": "clearnotes-hero",
    "copy-of-agentwrite.zip": "agentwrite-growth",
    "copy-of-agenwrite---geo-infrastructure.zip": "agenwrite-enterprise",
    "create-studio-landing-page.zip": "create-studio",
    "creatorflow-redesign.zip": "creatorflow",
    "drawgle.zip": "drawgle",
    "ecompin---aesthetic-publishing-engine.zip": "ecompin",
    "final-aligno-landing-page.zip": "aligno-landing",
    "founder-pricing-page.zip": "founder-pricing",
    "fundora-dashboard.zip": "fundora-dashboard",
    "good-copy-of-agenwrite.zip": "agenwrite-growth-engine",
    "influence-hero-section.zip": "influence-hero",
    "intelligent-systems-landing-page.zip": "intelligent-systems",
    "kinetik-landing-page.zip": "kinetik",
    "loomauth.zip": "loomauth",
    "lucid-ledger.zip": "lucid-ledger",
    "minto-dashboard.zip": "minto-dashboard",
    "new-stripdo.zip": "stripdo",
    "nousu-saas-landing-page.zip": "nousu-saas",
    "portfolio-hero (1).zip": "portfolio-hero",
    "premium-bento-grid.zip": "premium-bento",
    "premium-dash-replicator.zip": "apex-dashboard",
    "premium-motion-bento-grid.zip": "motion-bento",
    "quick-14-studio.zip": "quick-14-studio",
    "refind-copy.zip": "refind-ai",
    "remix_-pfpfor.me.zip": "pfp-ai",
    "scale-ai-hero-ui.zip": "scale-ai-hero",
    "sequence-studio.zip": "sequence-dashboard",
    "skywrite-ai.zip": "skywrite-ai",
    "thinking-orbs.zip": "thinking-orbs",
    "untitled.zip": "retro-camera",
    "vertical-motion-landing-page.zip": "vertical-motion",
}

zip_files = sorted(glob.glob(os.path.join(ROOT_DIR, "*.zip")))
print(f"Found {len(zip_files)} zip archives to extract.")

extracted_summary = []

for zip_path in zip_files:
    filename = os.path.basename(zip_path)
    slug = CUSTOM_SLUGS.get(filename, filename.replace(".zip", "").replace(" ", "-").lower())
    target_dir = os.path.join(TEMPLATES_DIR, slug)
    target_public_dir = os.path.join(PUBLIC_TEMPLATES_DIR, slug)
    os.makedirs(target_dir, exist_ok=True)
    os.makedirs(target_public_dir, exist_ok=True)
    
    download_target = os.path.join(PUBLIC_DOWNLOADS_DIR, f"{slug}.zip")
    shutil.copy2(zip_path, download_target)
    
    meta = {}
    pkg = {}
    
    with zipfile.ZipFile(zip_path, 'r') as z:
        namelist = z.namelist()
        
        for n in namelist:
            if n.endswith("metadata.json"):
                try:
                    meta = json.loads(z.read(n).decode('utf-8', errors='ignore'))
                except Exception:
                    pass
            if n.endswith("package.json"):
                try:
                    pkg = json.loads(z.read(n).decode('utf-8', errors='ignore'))
                except Exception:
                    pass

        for member in z.infolist():
            if member.filename.startswith("/") or ".." in member.filename:
                continue
            
            z.extract(member, target_dir)
            
            lower_name = member.filename.lower()
            if lower_name.endswith(('.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.mp4', '.ico')):
                asset_subpath = member.filename
                if asset_subpath.startswith("public/"):
                    asset_subpath = asset_subpath[7:]
                dest_asset = os.path.join(target_public_dir, os.path.basename(asset_subpath))
                try:
                    with open(dest_asset, "wb") as f_out:
                        f_out.write(z.read(member))
                except Exception as e:
                    print(f"Failed to copy asset {member.filename}: {e}")

    candidates = [
        os.path.join(target_dir, "app", "page.tsx"),
        os.path.join(target_dir, "app", "page.jsx"),
        os.path.join(target_dir, "src", "App.tsx"),
        os.path.join(target_dir, "src", "App.jsx"),
        os.path.join(target_dir, "App.tsx"),
        os.path.join(target_dir, "App.jsx"),
        os.path.join(target_dir, "demo", "App.tsx"),
        os.path.join(target_dir, "demo", "SimpleApp.tsx"),
        os.path.join(target_dir, "index.tsx")
    ]
    
    entry_file = None
    for c in candidates:
        if os.path.exists(c):
            entry_file = c
            break
            
    title = meta.get("name") or pkg.get("name") or slug.replace("-", " ").title()
    desc = meta.get("description") or ""
    
    if not title or title in ["ai-studio-applet", "react-example", ""]:
        if slug == "apex-dashboard":
            title = "Apex Analytics Dashboard"
            desc = "A high-performance modern SaaS metrics dashboard with interactive revenue charts, user conversion funnels, and system performance widgets."
        elif slug == "retro-camera":
            title = "Retro Polaroid AI Studio"
            desc = "A playful, vintage-inspired AI camera experience with skeuomorphic polaroids, tape effects, and photo transformations."
        else:
            title = slug.replace("-", " ").title()

    lower_text = f"{title} {desc} {slug}".lower()
    if "dash" in lower_text or "ledger" in lower_text or "fundora" in lower_text or "sequence" in lower_text or "minto" in lower_text:
        cat = "Dashboards"
    elif "bento" in lower_text:
        cat = "Bento Grids"
    elif "hero" in lower_text or "pattern" in lower_text or "orb" in lower_text:
        cat = "Hero & Motion"
    elif "pricing" in lower_text:
        cat = "Pricing Pages"
    else:
        cat = "Landing Pages"

    extracted_summary.append({
        "slug": slug,
        "title": title,
        "description": desc,
        "category": cat,
        "entry_file": os.path.relpath(entry_file, target_dir) if entry_file else None,
        "dependencies": list(pkg.get("dependencies", {}).keys())
    })

    # Create index.tsx wrapper in target_dir
    index_file = os.path.join(target_dir, "index.tsx")
    rel_entry = os.path.relpath(entry_file, target_dir).replace("\\", "/") if entry_file else None
    
    if rel_entry and rel_entry != "index.tsx":
        import_path = "./" + os.path.splitext(rel_entry)[0]
        with open(index_file, "w", encoding="utf-8") as f_index:
            f_index.write(f"""'use client';
import React from 'react';
import EntryComponent from '{import_path}';

export default function TemplateView() {{
  return (
    <div className="w-full min-h-screen">
      <EntryComponent />
    </div>
  );
}}
""")

    print(f"Extracted [{slug}] -> Title: {title} ({cat}) | Entry: {rel_entry}")

print(f"\nAll {len(extracted_summary)} templates successfully extracted and normalized!")

with open(os.path.join(ROOT_DIR, "extracted_summary.json"), "w", encoding="utf-8") as f:
    json.dump(extracted_summary, f, indent=2)
