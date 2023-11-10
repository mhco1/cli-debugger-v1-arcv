import Path from 'path'
import Fs from 'fs-extra'

const fileLoadPath = Path.resolve('src/events/__load.txt');
const fileIndexPath = Path.resolve('src/events/__index.js');
// console.log(fileLoadPath);

const fileLoad = await Fs.readFile(fileLoadPath,'utf-8');
const load = fileLoad.trim().split('\n').filter(el => el[0] !== '#');
const scripts = [];

for (const el of load) {
    const script = await Fs.readFile(Path.resolve('src/events',el),'utf-8');
    scripts.push(`events.on('${el}',${script})`);
}

await Fs.writeFile(fileIndexPath,scripts.join('\n'));