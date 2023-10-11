import { inspect } from 'util'

const e_name = 'e_repl_run';

export default [e_name, async () => {
    term.saveCursor();
    const mc = module.context;
    const name = mc.show.select();
    const c = mc.show.data()[name];
    const help = {
        command: [
            ['.help', 'Print this help message'],
            ['.clear', 'Clean the display'],
            ['.exit', 'Go to exit'],
            ['.context', 'Go to context menu'],
        ],
        function: [
            ['print', 'Print in screen'],
        ]
    };
    const command = {
        '.help': () => {
            term('command:\n');
            term.table(help.command, {
                hasBorder: false,
                width: 60,
            });
            term('function:\n');
            term.table(help.function, {
                hasBorder: false,
                width: 60,
            });
            events.emit('e_repl_run');
        },
        '.clear': () => {
            term.clear();
            events.emit('e_repl_run');
        },
        '.exit': () => {
            events.emit('e_end');
        },
        '.context': () => {
            term.restoreCursor();
            term.eraseDisplayBelow();
            events.emit('e_repl_menu_context');
        },
    };

    term.blue(name).red(' > ');

    const res = await term.inputField({
        history: c.history,
    }).promise;
    term('\n');

    if (c.history.at(-1) != res) c.history.push(res);

    if (res in command) return command[res]();

    const [err, msg] = mc.run(res);
    term(inspect(msg,{
        colors: true,
        showProxy: true,
    }),'\n');
    events.emit('e_repl_run');
}]