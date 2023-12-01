export default (main) => async () => {
    const { events, term } = main;
    const { path, fs, util } = main.modules.builtin;
    const { is } = main.modules.test;
    const { context } = main.datas;
    const { history } = context.c[context.now];

    const addHistory = (v) => (history.slice(-1)[0] != v) && history.push(v);
    const pathCommand = (v) => path.resolve(process.env.ROOT, 'src/events', `${v}.js`);

    term.blue(context.now).red(' > ');
    const expression = await term.inputField({
        history,
    }).promise;

    term('\n');
    addHistory(expression);

    if (is.repl.command(expression)) {
        const cmd = `command_${expression.slice(1)[0]}`;
        if (await !fs.exist(pathCommand(cmd))) throw Error('command not exist');
        return events.emit(cmd);
    }

    const res = await events._.context.run(expression);

    term(util.inspect(res, {
        colors: true,
        showProxy: true,
    }));

    term('\n');
    events._.repl.run();
}