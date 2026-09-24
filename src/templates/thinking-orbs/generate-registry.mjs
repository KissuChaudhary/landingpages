import fs from 'fs/promises';

async function run() {
  const code = await fs.readFile('demo/public/registry/thinking-orb.tsx', 'utf8');
  
  const registryObj = {
    name: "thinking-orb",
    type: "registry:ui",
    dependencies: ["react"],
    files: [
      {
        path: "thinking-orb.tsx",
        content: code,
        type: "registry:ui",
        target: "components/ui/thinking-orb.tsx"
      }
    ]
  };

  await fs.writeFile('demo/public/registry/thinking-orb.json', JSON.stringify(registryObj, null, 2));
  console.log("Registry JSON created.");
}
run();
