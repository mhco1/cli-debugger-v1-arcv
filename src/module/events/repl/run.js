import { inspect } from 'util'

const e_name = 'e_repl_run';

export default [e_name, async () => {
    // term.saveCursor();
    const { context: mc, command: cmd } = module;
    const name = mc.show.select();
    const c = mc.show.data()[name];
    term.blue(name).red(' > ');

    const res = await term.inputField({
        history: c.history,
    }).promise;
    term('\n');

    if (c.history.at(-1) != res) c.history.push(res);

    if (res[0] == '.' && res.slice(1) in cmd) return cmd[res.slice(1)][0]();

    const [err, msg] = mc.run(res);
    term(inspect(msg, {
        colors: true,
        showProxy: true,
    }), '\n');
    events.emit('e_repl_run');
}]