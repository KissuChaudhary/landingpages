const fs = require('node:fs');
const path = require('node:path');
const sharp = require('../next-templates/conduit/node_modules/sharp');
const originals = 'C:/Users/harva/.codex/generated_images/01a10f01-f469-7f51-8e3f-47d84642025b';
const files = {
  hero: 'exec-daaf58d4-83c0-4c8c-869d-e5c61ddf42f7.png',
  landscape: 'exec-27a1469e-17ef-4158-a3ec-db8d1f122ee5.png',
  mara: 'exec-25cbf574-7c3c-46f0-a3eb-1b8f414953b8.png',
  elliot: 'exec-7802c62c-4a40-42c8-b3e7-2e2ee94082c9.png',
  noa: 'exec-bfbda184-a06e-41ee-adf7-152349de5365.png',
  leo: 'exec-129fa869-6a3b-4740-a2e8-a74c9b4ec1d7.png',
};
const destination = path.resolve('next-templates/daybreak/public/images');
fs.mkdirSync(destination, {recursive: true});
Promise.all(Object.entries(files).map(async ([name,file])=> {
  fs.copyFileSync(path.join(originals,file), path.resolve('work/daybreak-art',name+'.png'));
  const output = path.join(destination,name+'.webp');
  await sharp(path.join(originals,file)).resize({width: name==='hero'||name==='landscape'?1536:640,withoutEnlargement:true}).webp({quality:88}).toFile(output);
  console.log(name,fs.statSync(output).size);
})).catch(e=>{console.error(e);process.exitCode=1;});
