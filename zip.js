import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

const zip = new AdmZip();

const excludeDirs = ['node_modules', 'dist', '.git'];

function addDirectory(dirPath, zipPath = '') {
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    if (excludeDirs.includes(item)) continue;
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      addDirectory(fullPath, path.join(zipPath, item));
    } else {
      zip.addLocalFile(fullPath, zipPath);
    }
  }
}

addDirectory(process.cwd());
zip.writeZip('./public/project.zip');
console.log('Zip created successfully at public/project.zip');
