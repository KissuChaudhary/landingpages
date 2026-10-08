from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
desktop = Image.open(root / 'work/relay-desktop.png').convert('RGB')
mobile = Image.open(root / 'work/relay-mobile.png').convert('RGB')
for name in ['card', 'card-full', 'full', 'mobile']:
    (root / 'public/previews' / name).mkdir(parents=True, exist_ok=True)
(root / 'public/og').mkdir(exist_ok=True)
desktop.crop((0, 0, desktop.width, round(desktop.width * 800 / 1280))).resize((1280, 800), Image.Resampling.LANCZOS).save(root / 'public/previews/card/relay.webp', quality=88, method=6)
desktop.resize((1200, round(desktop.height * 1200 / desktop.width)), Image.Resampling.LANCZOS).save(root / 'public/previews/card-full/relay.jpg', quality=83, optimize=True)
desktop.save(root / 'public/previews/full/relay.jpg', quality=87, optimize=True)
mobile.save(root / 'public/previews/mobile/relay.jpg', quality=88, optimize=True)
desktop.crop((0, 0, desktop.width, round(desktop.width * 630 / 1200))).resize((1200, 630), Image.Resampling.LANCZOS).save(root / 'public/og/relay.jpg', quality=88, optimize=True)
desktop.crop((0, 0, desktop.width, 1540)).save(root / 'work/relay-preview.jpg', quality=90, optimize=True)
print(f'Production captures packaged: desktop {desktop.size}, phone {mobile.size}.')
