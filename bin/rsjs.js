#!/usr/bin/env node

import Path from 'path'
import meow from 'meow';
import fs from 'fs-extra';

globalThis.root = '/mnt/home/x/pastas/projects/projects/aplications/node/cli-debugger';

const cli = (await import(Path.resolve(root, 'src/cli.js'))).default

const arg = meow(
    fs.readFileSync(Path.resolve(root, 'src/help.txt'), { encoding: 'utf-8' }),
    {
        importMeta: import.meta,
        flags: {
            // rainbow: {
            // 	type: 'boolean',
            // 	shortFlag: 'r'
            // }
        }
    }
);

cli(arg, root);