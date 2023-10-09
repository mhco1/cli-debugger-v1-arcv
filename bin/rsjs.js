#!/usr/bin/env node

import meow from 'meow';
import fs from 'fs-extra';
import cli from '../src/cli.js';
// import cli from '../src/teste_cli.js';

const arg = meow(
    fs.readFileSync('src/help.txt', { encoding: 'utf-8' }),
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

cli(arg);