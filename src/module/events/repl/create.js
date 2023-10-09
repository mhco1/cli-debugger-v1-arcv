const e_name = 'e_repl_create';

export default [e_name, async () => {
    term.saveCursor();
    const c = module.context;
    term('Write the new context name:\n')
    const res = await term.inputField({}).promise;
    term('\n');
    const [err, msg] = c.new(res);
    term(msg,'\n');
    await term.inputField({echo:false}).promise;
    term.restoreCursor();
    term.eraseDisplayBelow();
    events.emit('e_repl_menu_context');
}]