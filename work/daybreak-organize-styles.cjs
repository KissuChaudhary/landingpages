const fs=require('node:fs');
const path=require('node:path');
const postcss=require('../node_modules/postcss');
const styles=path.resolve('next-templates/daybreak/styles');
function rule(text){return postcss.parse(text).first;}
function set(node,prop,value){const old=node.nodes.find(n=>n.type==='decl'&&n.prop===prop);if(old)old.value=value;else node.append({prop,value});}
const hero=postcss.parse(fs.readFileSync(path.join(styles,'navigation-hero.css'),'utf8'));
hero.walkRules(node=>{
  if(node.selector==='.hero')node.selector='.hero-composition';
  if(node.selector==='.hero-landscape'&&node.parent.type==='root')set(node,'mask-image','linear-gradient(transparent 0%,#000 28%)');
  if(node.selector==='.collaborator'){set(node,'--cursor','#81b1f6');set(node,'color','var(--cursor)');}
  if(node.selector==='.collaborator-two'&&node.parent.type==='root'){set(node,'--cursor','#e4b641');set(node,'color','var(--cursor)');}
  if(node.selector==='.collaborator i:after'||node.selector==='.collaborator-two i:after')node.remove();
  if(node.selector==='.collaborator i'){
    if(node.nodes.length===1){node.remove();return;}
    set(node,'background','var(--cursor)');set(node,'color','#fff');set(node,'font-size','11px');
  }
});
hero.prepend(rule('.hero{position:relative;overflow:visible;padding:0;display:block}'));
const composition=hero.nodes.find(n=>n.type==='rule'&&n.selector==='.hero-composition');
set(composition,'position','relative');
fs.writeFileSync(path.join(styles,'navigation-hero.css'),hero.toString());
function split(file,classify){
  const source=postcss.parse(fs.readFileSync(path.join(styles,file),'utf8'));
  const output={};
  function append(key,node,media){output[key] ||= postcss.root();if(!media){output[key].append(node.clone());return;}let group=output[key].nodes.find(n=>n.type==='atrule'&&n.name===media.name&&n.params===media.params);if(!group){group=media.clone({nodes:[]});output[key].append(group);}group.append(node.clone());}
  for(const node of source.nodes){if(node.type==='atrule'){for(const child of node.nodes||[])append(classify(child.selector||''),child,node);}else append(classify(node.selector||''),node);}
  for(const [name,root] of Object.entries(output))fs.writeFileSync(path.join(styles,name),root.toString()+'\n');
}
split('product.css',s=>/^\.(dashboard|dash-|bar-chart|chart-axis|channel-bars|line-chart)/.test(s)?'dashboard.css':/^\.(workspace-|tour-|report-|metrics-grid)/.test(s)?'workspace-report.css':'product.css');
const chapters=postcss.parse(fs.readFileSync(path.join(styles,'chapters.css'),'utf8'));
chapters.walkRules(node=>{
  if(node.selector==='.closing-section')set(node,'overflow','visible');
  if(node.selector==='.closing-section>img')node.selector='.closing-art>img';
});
chapters.append(rule('.closing-art{position:absolute;inset:0;overflow:hidden;isolation:isolate;z-index:0;pointer-events:none}'));
fs.writeFileSync(path.join(styles,'chapters.css'),chapters.toString());
split('chapters.css',s=>/^\.(integration|garden)/.test(s)?'integrations.css':/^\.(story|stories)/.test(s)?'stories.css':/^\.(closing)/.test(s)?'closing.css':'solutions.css');
fs.unlinkSync(path.join(styles,'chapters.css'));fs.unlinkSync(path.join(styles,'artwork.css'));
fs.writeFileSync(path.resolve('next-templates/daybreak/app/globals.css'),['base','navigation-hero','product','dashboard','workspace-report','integrations','solutions','stories','closing','pricing-footer','pages','motion'].map(s=>`@import "../styles/${s}.css";`).join('\n')+'\n');
console.log('Artwork rules consolidated; product and chapter styles split by component.');
