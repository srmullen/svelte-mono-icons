const path = require('path');
const { pascalCase } = require('pascal-case');
const fs = require('fs-extra');
const svgson = require('svgson');

const svgPath = './node_modules/mono-icons/svg/';

const files = fs.readdirSync(svgPath);

const template = icon =>
`<script>
  export let size = '100%';
  let customClass = '';
  export { customClass as class };

  if (size !== "100%") {
    size = size.slice(-1) === 'x' 
          ? size.slice(0, size.length -1) + 'em'
          : parseInt(size) + 'px';
  }
</script>

<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mono mono-${icon.name} {customClass}">
${icon.data}
</svg>
`;

Promise.all(files.map(async filename => {
  const file = await fs.readFile(`${svgPath}${filename}`, 'utf8');
  const info = path.parse(filename);
  const componentName = pascalCase(`${info.name}-icon`);
  const filepath = `./src/icons/${componentName}.svelte`;
  const json = await svgson.parse(file)
  const pathdata = svgson.stringify(json.children);
  const component = template({ name: info.name, data: pathdata });
  await fs.ensureDir(path.dirname(filepath));
  await fs.writeFile(filepath, component, 'utf8');
  return { componentName };
})).then((components) => {
  const exportTemplate = (componentName) => `export { default as ${componentName} } from './icons/${componentName}.svelte'`;
  const index = components.map(({ componentName }) => exportTemplate(componentName)).join('\n');
  return fs.outputFile('./src/index.js', index, 'utf8');
});