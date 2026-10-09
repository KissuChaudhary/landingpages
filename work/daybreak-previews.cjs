const path = require('node:path');
const fs = require('node:fs');
const sharp = require('../next-templates/conduit/node_modules/sharp');
const root = path.resolve(__dirname, '..');
const desktop = path.join(__dirname, 'daybreak-desktop.png');
const mobile = path.join(__dirname, 'daybreak-mobile.png');
async function main() {
  const desktopMeta = await sharp(desktop).metadata();
  const mobileMeta = await sharp(mobile).metadata();
  const desktopWidth = desktopMeta.width;
  const mobileWidth = mobileMeta.width;
  const tasks = [
    ['public/previews/card/daybreak.webp', sharp(desktop).extract({left:0,top:0,width:desktopWidth,height:Math.round(desktopWidth/1.6)}).resize(1280,800).webp({quality:88})],
    ['public/previews/card-full/daybreak.jpg', sharp(desktop).extract({left:0,top:0,width:desktopWidth,height:desktopMeta.height}).resize({width:1200}).jpeg({quality:87})],
    ['public/previews/full/daybreak.jpg', sharp(desktop).extract({left:0,top:0,width:desktopWidth,height:desktopMeta.height}).resize({width:1200}).jpeg({quality:90})],
    ['public/previews/mobile/daybreak.jpg', sharp(mobile).extract({left:0,top:0,width:mobileWidth,height:mobileMeta.height}).resize({width:390}).jpeg({quality:88})],
    ['public/og/daybreak.jpg', sharp(desktop).extract({left:0,top:0,width:desktopWidth,height:Math.round(desktopWidth*630/1200)}).resize(1200,630).jpeg({quality:89})],
    ['work/daybreak-preview.jpg', sharp(desktop).extract({left:0,top:0,width:desktopWidth,height:930}).resize({width:1100}).jpeg({quality:90})],
    ['work/daybreak-desktop-review.jpg', sharp(desktop).extract({left:0,top:0,width:desktopWidth,height:desktopMeta.height}).resize({width:780}).jpeg({quality:88})],
    ['work/daybreak-mobile-review.jpg', sharp(mobile).extract({left:0,top:0,width:mobileWidth,height:mobileMeta.height}).resize({width:390}).jpeg({quality:88})],
  ];
  for (const [file, pipeline] of tasks) {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), {recursive:true});
    await pipeline.toFile(target);
  }
  console.log({desktop:desktopMeta.width+'x'+desktopMeta.height,mobile:mobileMeta.width+'x'+mobileMeta.height,previews:tasks.length});
}
main().catch(error => {console.error(error);process.exitCode=1;});
