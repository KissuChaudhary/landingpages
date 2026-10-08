from pathlib import Path
from PIL import Image
import json

root = Path(__file__).resolve().parent.parent
hero = Image.open(root / 'work/patch-hero.png').convert('RGB')
desktop = Image.open(root / 'work/patch-desktop.png').convert('RGB')
mobile = Image.open(root / 'work/patch-mobile.png').convert('RGB')
print('Captured dimensions:', hero.size, desktop.size, mobile.size)
for directory in ['card', 'card-full', 'full', 'mobile']:
    (root / 'public/previews' / directory).mkdir(parents=True, exist_ok=True)
(root / 'public/og').mkdir(exist_ok=True)
card = desktop.crop((0, 0, desktop.width, round(desktop.width * 800 / 1280))).resize((1280,800), Image.Resampling.LANCZOS)
card.save(root / 'public/previews/card/patch.webp', quality=88, method=6)
desktop.resize((1200, round(desktop.height * 1200 / desktop.width)), Image.Resampling.LANCZOS).save(root / 'public/previews/card-full/patch.jpg', quality=83, optimize=True)
desktop.save(root / 'public/previews/full/patch.jpg', quality=87, optimize=True)
mobile.save(root / 'public/previews/mobile/patch.jpg', quality=88, optimize=True)
desktop.crop((0, 0, desktop.width, round(desktop.width * 630 / 1200))).resize((1200,630), Image.Resampling.LANCZOS).save(root / 'public/og/patch.jpg', quality=88, optimize=True)
desktop.crop((0, 0, desktop.width, 980)).save(root / 'work/patch-preview.jpg', quality=90, optimize=True)

# Restore only generated changes from the isolated build, preserving any other edits.
config_path = root / 'tsconfig.json'
baseline_text = (root / 'work/patch-root-tsconfig.before.json').read_text(encoding='utf-8-sig')
baseline = json.loads(baseline_text)
current = json.loads(config_path.read_text(encoding='utf-8-sig'))
current['include'] = [item for item in current['include'] if item != 'build/patch-marketplace/types/**/*.ts']
normalized_current = {**current, 'include':sorted(current['include'])}
normalized_baseline = {**baseline, 'include':sorted(baseline['include'])}
if normalized_current == normalized_baseline:
    config_path.write_bytes((root / 'work/patch-root-tsconfig.before.json').read_bytes())
else:
    raise RuntimeError('Concurrent tsconfig changes detected; inspect before restoring generated references.')
env_path = root / 'next-env.d.ts'
env = env_path.read_text(encoding='utf-8-sig')
env = env.replace('./build/patch-marketplace/types/routes.d.ts', './.next/types/routes.d.ts')
baseline_env_path = root / 'work/patch-root-next-env.before.txt'
if env == baseline_env_path.read_text(encoding='utf-8-sig'):
    env_path.write_bytes(baseline_env_path.read_bytes())
else:
    env_path.write_text(env, encoding='utf-8', newline='')
print('Marketplace screenshots prepared; isolated build references restored.')
