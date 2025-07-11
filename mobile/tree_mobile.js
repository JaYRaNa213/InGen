const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const outputFile = path.join(__dirname, 'mobile_tree.txt');
const exclude = ['node_modules', '.git', '.expo', '.idea'];

function generateTree(dir, prefix = '') {
  const items = fs.readdirSync(dir).filter(item => !exclude.includes(item));
  let tree = '';

  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    tree += `${prefix}${connector}${item}\n`;

    if (fs.statSync(fullPath).isDirectory()) {
      const nextPrefix = prefix + (isLast ? '    ' : '│   ');
      tree += generateTree(fullPath, nextPrefix);
    }
  });

  return tree;
}

const treeOutput = `mobile/\n${generateTree(baseDir)}`;
fs.writeFileSync(outputFile, treeOutput, 'utf-8');
console.log(`✅ Tree generated at: ${outputFile}`);
