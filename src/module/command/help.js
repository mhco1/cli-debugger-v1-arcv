export default [() => {
    const cmd = module.command;
    const cmdNames = Object.keys(cmd);

    const help = {
        command: cmdNames.map(el => [`.${el}`, cmd[el][1]]),
        function: [
            ['print', 'Print in screen'],
        ]
    };

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
}, 'Print this help message']