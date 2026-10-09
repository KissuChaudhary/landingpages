from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
hero = Image.open(root / 'work/patch-hero.png').convert('RGB')
desktop = Image.open(root / 'work/patch-desktop.png').convert('RGB')
card_source = Image.open(root / 'work/patch-card-source.png').convert('RGB')
mobile = Image.open(root / 'work/patch-mobile.png').convert('RGB')
print('Captured dimensions:', hero.size, desktop.size, mobile.size)
for directory in ['card', 'card-full', 'full', 'mobile']:
    (root / 'public/previews' / directory).mkdir(parents=True, exist_ok=True)
(root / 'public/og').mkdir(exist_ok=True)
card = card_source.crop((0, 0, card_source.width, round(card_source.width * 800 / 1280))).resize((1280,800), Image.Resampling.LANCZOS)
card.save(root / 'public/previews/card/patch.webp', quality=88, method=6)
desktop.resize((1200, round(desktop.height * 1200 / desktop.width)), Image.Resampling.LANCZOS).save(root / 'public/previews/card-full/patch.jpg', quality=83, optimize=True)
desktop.save(root / 'public/previews/full/patch.jpg', quality=87, optimize=True)
mobile.save(root / 'public/previews/mobile/patch.jpg', quality=88, optimize=True)
desktop.crop((0, 0, desktop.width, round(desktop.width * 630 / 1200))).resize((1200,630), Image.Resampling.LANCZOS).save(root / 'public/og/patch.jpg', quality=88, optimize=True)
desktop.crop((0, 0, desktop.width, 980)).save(root / 'work/patch-preview.jpg', quality=90, optimize=True)

print('Marketplace screenshots prepared.')
