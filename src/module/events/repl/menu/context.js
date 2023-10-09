const e_name = 'e_repl_menu_context';

export default [e_name, async () => {
    term.saveCursor();
    const c = module.context;
    const _new = '+ new'
    const itens = [_new, ...Object.keys(c.show.data())];
    const res = (await term.singleColumnMenu(itens, {}).promise).selectedText;
    
    term.restoreCursor();
    term.eraseDisplayBelow();
    
    if (res == _new) {
        events.emit('e_repl_create');
        return
    }

    c.select(res);
    events.emit('e_repl_menu_option');
}]