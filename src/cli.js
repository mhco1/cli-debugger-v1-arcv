import * as imp from '#src/import.js'

export default (args) => {
    Object.assign(globalThis, imp);

    const { toPromise } = modules.tools;
    const { event, fs } = modules.builtin;
    const fsStat = toPromise(fs.stat);

    term.clear();
    term.on('key', (name, matches, data) => {
        if (name == 'CTRL_C') events.emit('e_end');
        if (name == 'CTRL_T') debugger;
    })

    globalThis.events = new event();
    events.emit2 = toPromise((...args) => events.emit(...args));
    fs.exist = async (dir) => { let res; try { fsStat(dir); return true; } catch (err) { return false; } };

    for (const name in listeners) {
        const fn = (listeners[name]).default;
        events.on(name, fn);
    }

    //---

    events.emit2('context_create', 'context')
        .then(res => events.emit2('context_select', 'context'))
        .then(res => events.emit('_start'));
}