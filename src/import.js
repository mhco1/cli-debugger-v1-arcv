import fs from 'node:fs';
import path from 'node:path';
import event from 'node:events';
import childProcess from 'node:child_process';
import util from 'node:util';

import terminal from 'terminal-kit';
import asciify from 'asciify'

import datas from '#src/data.js';
import * as listeners from '#src/events/__index.js';

import test from '#src/modules/test.js';
import uuid from '#src/modules/tools/uuid.js';
import toPromise from '#src/modules/tools/toPromise.js';
import accessRef from '#src/modules/tools/accessRef.js';

export const term = terminal.terminal;
export const modules = {
    test,
    tools: {
        uuid,
        toPromise,
        accessRef,
    },
    builtin: {
        fs,
        path,
        event,
        childProcess,
        asciify,
        util,
    }
};
export {
    datas,
    listeners,
};