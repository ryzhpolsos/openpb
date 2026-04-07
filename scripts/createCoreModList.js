const fs = require('fs');
const path = require('path');

const PATH = 'public/mods'; 
let data = [];

for(let file of fs.readdirSync(PATH, { recursive: true })){
    if(file == 'list.txt') continue;

    file = file.replaceAll('\\', '/');
    let filePath = path.join(PATH, file).replaceAll('\\', '/');
    if(fs.statSync(filePath).isDirectory()) continue;

    data.push(file);
}

fs.writeFileSync('public/mods/list.txt', data.join('\n'));
