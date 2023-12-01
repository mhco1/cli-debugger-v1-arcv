import * as imp from '#src/import.js'

export default (args) => {
    const main = Object.assign({}, imp);
    const { term, events, listeners } = main;
    const { toPromise, deepObject, extractArguments } = main.modules.tools;
    const { fs } = main.modules.builtin;
    const fsStat = toPromise(fs.stat);

    term.clear();
    term.on('key', (name, matches, data) => {
        if (name == 'CTRL_C') events._.end();
        if (name == 'CTRL_T') debugger;
    });

    main.modules.test = main.modules.test(main);

    fs.exist = async (dir) => { let res; try { fsStat(dir); return true; } catch (err) { return false; } };

    events.emit2 = toPromise((...args) => events.emit(...args));
    events._ = {};

    Object.keys(listeners).forEach(name => {
        const fn = (listeners[name]).default(main);
        const arr = name.split('_').filter(el => el);
        const last = arr.pop();
        const argsNames = extractArguments(fn);

        deepObject(arr, events._)[last] = argsNames.slice(-1)[0] == 'callback' ?
            (...args) => events.emit2(name, ...args) :
            (...args) => events.emit(name, ...args);
        events.on(name, fn);
    });

    //---

    (async () => { })()
        .then(res => events._.context.create('context'))
        .then(res => events._.context.select('context'))
        .then(res => events._.start())
        .catch(err => term(err, '\n'));
}