import os
import re

ROOT_DIR = os.path.abspath("e:/tutorial/founderdada")
TEMPLATES_DIR = os.path.join(ROOT_DIR, "src", "templates")

slugs = [d for d in os.listdir(TEMPLATES_DIR) if os.path.isdir(os.path.join(TEMPLATES_DIR, d))]
print(f"Scanning {len(slugs)} templates for import and syntax fixes...")

fixed_count = 0

for slug in slugs:
    template_path = os.path.join(TEMPLATES_DIR, slug)
    for root, dirs, files in os.walk(template_path):
        for fname in files:
            if fname.endswith(('.tsx', '.ts', '.jsx', '.js')):
                file_path = os.path.join(root, fname)
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    
                    original_content = content
                    
                    # 1. Rewrite @/ to @/templates/{slug}/ for components, lib, hooks, assets
                    content = re.sub(
                        r"(['\"])@/(components|lib|hooks|assets|utils|services)/",
                        rf"\1@/templates/{slug}/\2/",
                        content
                    )

                    # 2. Fix unescaped >> or << in JSX text
                    # Look for lines with >> not inside code or strings
                    def fix_angle_brackets(match):
                        line = match.group(0)
                        if ">" in line and not ("<" in line and ">" in line and "/" in line):
                            # Replace naked >> with &gt;&gt;
                            return line.replace(">>", "&gt;&gt;")
                        return line

                    content = re.sub(r"[ \t]+>>[^\n]*", lambda m: m.group(0).replace(">>", "&gt;&gt;"), content)

                    # 3. Check for any motion/react import vs framer-motion compatibility
                    # Both are installed, but if motion/react is used: motion v12 supports it.

                    if content != original_content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(content)
                        fixed_count += 1
                except Exception as e:
                    print(f"Error fixing {file_path}: {e}")

print(f"Applied fixes across {fixed_count} template files.")
