async () => {
    const { promisify } = await import('util');
    const Asciify = await import('asciify');

    const asciify = promisify(Asciify);
    const res = await asciify('Debugger Tool', { color: "green", font: 'drpepper' })
    term(res, '\n');
    term("Type '.help' for more information\n");
    term("Press CTRL+C or type .exit to exit \n");
    events.emit('repl_run');
}