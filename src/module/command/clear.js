export default [() => {
    term.clear();
    events.emit('e_repl_run');
}, 'Clean the display']