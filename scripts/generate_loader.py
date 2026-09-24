import os

ROOT_DIR = os.path.abspath("e:/tutorial/founderdada")
TEMPLATES_DIR = os.path.join(ROOT_DIR, "src", "templates")
SLUGS = sorted([d for d in os.listdir(TEMPLATES_DIR) if os.path.isdir(os.path.join(TEMPLATES_DIR, d))])

lines = [
    "'use client';",
    "import React from 'react';",
    "import dynamic from 'next/dynamic';",
    "",
    "const Loading = () => (",
    "  <div className=\"flex min-h-screen items-center justify-center bg-slate-950 text-slate-400\">",
    "    <div className=\"flex flex-col items-center gap-3\">",
    "      <div className=\"h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent\" />",
    "      <span className=\"text-xs font-medium\">Loading component...</span>",
    "    </div>",
    "  </div>",
    ");",
    "",
    "export const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<any>> = {"
]

for slug in SLUGS:
    lines.append(f"  '{slug}': dynamic(() => import('@/templates/{slug}'), {{ ssr: false, loading: Loading }}),")

lines.append("};")
lines.append("")
lines.append("export function getTemplateComponent(slug: string): React.ComponentType<any> | undefined {")
lines.append("  return TEMPLATE_COMPONENTS[slug];")
lines.append("}")

with open(os.path.join(TEMPLATES_DIR, "registry.tsx"), "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Generated src/templates/registry.tsx with {len(SLUGS)} components!")
