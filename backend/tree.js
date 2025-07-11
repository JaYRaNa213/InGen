import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = __dirname;
const outputFile = path.join(__dirname, 'backend_tree.txt');
const exclude = ['node_modules', '.git'];

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

const treeOutput = `backend/\n${generateTree(baseDir)}`;
fs.writeFileSync(outputFile, treeOutput, 'utf-8');
console.log(`✅ Tree generated at: ${outputFile} (excluding ${exclude.join(', ')})`);
