export default async () => {
    const { path, fs, util } = modules.builtin;
    const { context } = datas;
    const { history } = context.c[context.now];

    const addHistory = (v) => (history.slice(-1)[0] != v) && history.push(v);
    const isCommand = (v) => (v[0] == '.');
    const pathCommand = (v) => path.resolve(process.env.ROOT, 'src/events', `${v}.js`);

    term.blue(context.now).red(' > ');
    const expression = await term.inputField({
        history,
    }).promise;

    term('\n');
    addHistory(expression);

    if (isCommand(expression)) {
        const cmd = `command_${expression.slice(1)[0]}`;
        if (await !fs.exist(pathCommand(cmd))) throw Error('command not exist');
        return events.emit(cmd);
    }

    const res = await events.emit2('context_run', expression);

    term(util.inspect(res, {
        colors: true,
        showProxy: true,
    }));

    term('\n');
    events.emit('repl_run');
}