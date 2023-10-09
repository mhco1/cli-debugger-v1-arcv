const e_name = 'e_repl_edit';

export default [e_name, async () => {
    term.saveCursor();
    const c = module.context;
    term(`Write the new name to '${c.show.select()}':\n`)
    const res = await term.inputField({}).promise;
    term('\n');
    const [err, msg] = c.edit(res);
    term(msg,'\n');
    await term.inputField({echo:false}).promise;
    term.restoreCursor();
    term.eraseDisplayBelow();
    events.emit('e_repl_menu_context');
}]