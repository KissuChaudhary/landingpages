from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
desktop = Image.open(root / 'work/index-desktop.png').convert('RGB')
mobile_frame = Image.open(root / 'work/index-mobile-frame.png').convert('RGB')
mobile = mobile_frame.crop((0, 0, 390, mobile_frame.height))
mobile.save(root / 'work/index-mobile.png')
for directory in ['card', 'card-full', 'full', 'mobile']:
    (root / 'public/previews' / directory).mkdir(parents=True, exist_ok=True)
(root / 'public/og').mkdir(exist_ok=True)
desktop.crop((0, 0, desktop.width, round(desktop.width * 800 / 1280))).resize((1280, 800), Image.Resampling.LANCZOS).save(root / 'public/previews/card/index.webp', quality=88, method=6)
desktop.resize((1200, round(desktop.height * 1200 / desktop.width)), Image.Resampling.LANCZOS).save(root / 'public/previews/card-full/index.jpg', quality=85, optimize=True)
desktop.save(root / 'public/previews/full/index.jpg', quality=88, optimize=True)
mobile.save(root / 'public/previews/mobile/index.jpg', quality=90, optimize=True)
desktop.crop((0, 0, desktop.width, round(desktop.width * 630 / 1200))).resize((1200, 630), Image.Resampling.LANCZOS).save(root / 'public/og/index.jpg', quality=90, optimize=True)
desktop.crop((0, 0, desktop.width, 1040)).save(root / 'work/index-preview.jpg', quality=92, optimize=True)

# Readable contact sheet for review of the complete phone composition.
review = Image.new('RGB', (1170, 2400), '#e9e7e1')
for i, (top, bottom) in enumerate([(0, 1152), (1593, 2750), (3050, 4250), (4267, 5218), (6930, 8130), (9120, 10264)]):
    crop = mobile.crop((0, top, 390, bottom))
    review.paste(crop, ((i % 3) * 390, (i // 3) * 1200))
review.save(root / 'work/index-mobile-review.jpg', quality=92)

source_root = root / 'next-templates/index'
files = [file for folder in ['app', 'components', 'data', 'lib', 'styles'] for file in (source_root / folder).rglob('*') if file.suffix in {'.ts', '.tsx', '.css'}]
files += [source_root / 'site.config.ts', source_root / 'next.config.ts']
print('Source files:', len(files), 'Lines:', sum(len(file.read_text(encoding='utf-8').splitlines()) for file in files))
print('Captured dimensions:', desktop.size, mobile.size)
print('Index marketplace screenshots prepared.')
