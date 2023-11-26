const childProcess = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const repl = require('node:repl');

const toPromise = (fn) => (...args) => new Promise((resolve, reject) => fn(...args, (err, data) => err ? reject(err) : resolve(data)));

const fsStat = toPromise(fs.stat);
const fsReadFile = toPromise(fs.readFile);

const fsExist = async (dir) => { let res; try { fsStat(dir); return true; } catch (err) { return false; } }

const convertRaw = (arg) => {
    const a = arg[0];
    const b = arg.slice(1);
    return a.map((el, id) => [el, b[id]]).flat().join('')
}

const regPath = (a) => (/^((\/|\.\/|\.\.\/)+|([\w\d]+([\-.]+[\w\d]+)*))+$/g).test(a);
const regKey = (a) => (/^[\w\d][\-\w\d]*$/g).test(a);

const modules = [...repl.builtinModules, ...Object.keys(pkg.dependencies)];
const alias = {};

module.exports = (...arg) => {
    let dir = root;

    const rec = (...arg) => {
        if (arg[0].raw) {
            const str = convertRaw(arg).replace(/\s+/g, '');

            if (/^\#/g.test(str)) {
                const k = str.slice(1);
                if (!isValidKey(k)) throw Error('invalid key format');
                dir = alias[k];
            }
            else if (/\-\>/g.test(str)) {
                const [k, v] = str.split('->');
                let p = v;

                if (!regKey(k)) throw Error('invalid key format');

                if (/^\#/g.test(v)) {
                    const [vk, vp] = v.slice(1).split(/(^[^/]+)\//).slice(1);
                    if (!regPath(vp)) throw Error('invalid path format');
                    p = path.resolve(alias[vk], vp);
                }

                if (!regPath(p)) throw Error('invalid path format');
                dir = alias[k] = path.resolve(dir, p);
            }
            else {
                if (!regPath(str)) throw Error('invalid path format');
                dir = path.resolve(dir, str);
            }

            // if(!) throw Error('invalid format');

            return rec
        }

        return new Promise(async (resolve, reject) => {
            let res;
            let exist;
            const [str, op] = arg;
            let [name, extension] = str.split('.');

            if (modules.includes(name)) {
                dir = name;
                exist = true;
            } else {
                if (!extension) extension = 'js';
                dir = path.resolve(dir, `${name}.${extension}`);
                exist = await fsExist(dir);
            }

            if (op == 'dir') return resolve(dir);
            if (op == 'exist') return resolve(exist);
            if (!exist) throw Error(`file ${dir} not exist`);
            if (op == 'fork') return resolve(childProcess.fork(dir));

            if ((/js|mjs/ig).test(extension) || op == 'node') {
                res = require(dir);
                res = res.default || res;
            } else {
                res = String(await fsReadFile(dir));
            }

            return resolve(res)
        })
    }

    return rec(...arg);
}


// () => {
//     let nextLink;
//     let dir = root;

//     return nextLink = (middle = '') => {
//         dir = path.resolve(dir, middle);

//         if (middle.length > 0) return nextLink
//         return async (name, op = '') => {
//             let res;
//             let [_name, extension] = name.split('.');
//             if (!extension) extension = 'js';
//             const _dir = op == 'node' ? _name : path.resolve(dir, `${_name}.${extension}`);
//             const exist = (await fsStat(_dir));

//             if (op == 'exist') return exist;
//             if (!exist && op == 'node') throw Error(`file ${_dir} not exist`);
//             if (op == 'dir') return _dir;
//             if (op == 'fork') return childProcess.fork(_dir);

//             if ((/js|mjs/ig).test(extension) || op == 'node') {
//                 res = await import(_dir);
//                 res = res.default || res;
//             } else {
//                 res = String(await fsReadFile(_dir));
//             }
//             return res
//         }
//     }
// }