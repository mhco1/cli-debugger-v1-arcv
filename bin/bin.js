#!/usr/bin/env node

import 'dotenv/config';
if (process.env.DEBUGGER == 'true') debugger;
import pkg from '../package.json' assert {type: 'json'};
import path from 'node:path';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

globalThis.pkg = pkg
const argv = yargs(hideBin(process.argv)).argv;
const dir = path.resolve(process.env.ROOT, process.env.DEBUGGER ? 'src/cli.js' : 'dist/cli.js');
const cli = (await import(dir)).default;
cli(argv);