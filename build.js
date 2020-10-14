const path = require('path');
const { pascalCase } = require('pascal-case');
const fs = require('fs-extra');
const svgson = require('svgson');

const svgPath = './node_modules/mono-icons/svg/';

const files = fs.readdirSync(svgPath);

const template = data =>
`<script>
  export let size = '100%';
  let customClass = '';
  export { customClass as class };

  if (size !== "100%") {
    size = size.slice(-1) === 'x' 
          ? size.slice(0, size.length -1) + 'em'
          : parseInt(size) + 'px';
  }
<script>

<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
${data}
</svg>
`;

const filename = files[0];
fs.readFile(`${svgPath}${filename}`, 'utf8').then(async file => {
  const json = await svgson.parse(file);
  const pathdata = svgson.stringify(json.children);
  const component = template(pathdata);

  const info = path.parse(filename);
  const componentName = pascalCase(`${info.name}-icon`);
  const filepath = `./src/icons/${componentName}.svelte`;
  return fs.ensureDir(path.dirname(filepath)).then(() => fs.writeFile(filepath, component, 'utf8'));
});

// files.forEach(name => {
//   // const icon = name.split('.')
  // const info = path.parse(name);
//   if (info.ext === '.svg') {
    // const componentName = pascalCase(`${info.name}-icon`);
//     console.log(componentName);
//   }
// });