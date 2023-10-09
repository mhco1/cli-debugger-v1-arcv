const e_name = 'e_repl_menu_option';

export default [e_name, async () => {
    term.saveCursor();
    const c = module.context;
    const op = {
        run: 'e_repl_run',
        edit: 'e_repl_edit',
        delete: 'e_repl_delete',
    }
    
    term('> ', c.show.select(), '\n');
    const res = (await term.singleLineMenu(Object.keys(op), { selectedStyle: term.inverse }).promise).selectedText;
    
    term.restoreCursor();
    term.eraseDisplayBelow();
    
    events.emit(op[res]);
}]