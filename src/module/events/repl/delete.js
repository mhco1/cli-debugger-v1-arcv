const e_name = 'e_repl_delete';

export default [e_name, async () => {
    term.saveCursor();
    const c = module.context;
    term(`Are you sure you will delete the context '${c.show.select()}'? [y,N] `);
    const res = await term.yesOrNo({ yes: ['Y','y'], no: ['N','n', 'ENTER'] }).promise;
    term('\n');
    if (res) {
        const [err, msg] = c.del();
        term(msg,'\n');
        await term.inputField({echo:false}).promise;
    }
    term.restoreCursor();
    term.eraseDisplayBelow();
    events.emit('e_repl_menu_context');
}]