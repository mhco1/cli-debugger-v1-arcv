const fs = require('fs-extra');

Object.assign(globalThis,{
    term:require('terminal-kit').terminal,
    events:require('events').default,
    data: require('#src/data.js').default,
    modules: require('#src/modules.js').default,
})

if(!fs.pathExists('#src/events/__index.js')) require('#src/bundle.js')
require('#src/events/__index.js');

term.clear();

term.on('key', (name, matches, data) => {
    if (name == 'CTRL_C') events.emit('e_end');
    if (name == 'CTRL_T') debugger;
})

export default async (arg) => {
    events.emit('context_create', 'context');
    events.emit('context_select', 'context');
    events.emit('_start');
}