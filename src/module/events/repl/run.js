const e_name = 'e_repl_run';
let start = true;

export default [e_name, async () => {
    term.saveCursor();
    const c = module.context;

    if (start) {
        term("Type '.help' for more information\n")
        start = false;
    }

    term(`${c.show.select()} >> `);
    const res = await term.inputField({}).promise;
    term('\n');

    if (res == '.help') {
        term.table([
            ['.help', 'Print this help mmessage'],
            ['.context', 'Go to context menu'],
        ], {
            hasBorder: false,
            width: 60,
        })
        term('\n');
        events.emit('e_repl_run');
        return
    }

    if (res == '.context') {
        start = true;
        term.restoreCursor();
        term.eraseDisplayBelow();
        events.emit('e_repl_menu_context');
        return
    }

    const [err, msg] = c.run(res);
    term(msg, '\n');
    events.emit('e_repl_run');
}]