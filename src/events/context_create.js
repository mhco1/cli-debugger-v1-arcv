export default (main) => async (name = '', callback) => {
    let res, err;
    const { childProcess, path } = main.modules.builtin;
    const { uuid } = main.modules.tools;
    const { is, has } = main.modules.test;
    const { context } = main.datas;

    (() => {
        if (!is.context.validFormat(name)) return (err = 'Invalid format to new context')
        if (has.context(name)) return (err = 'There is already a context with this name');

        const dir = path.resolve(process.env.ROOT, 'src/server.js');
        const node = childProcess.fork(dir, {
            env: {
                NAME: name,
            }
        });

        const requests = {};
        context.c[name] = {
            node,
            history: [],

            send: (exe, data) => new Promise((resolve, reject) => {
                const id = uuid();
                requests[id] = (err, res) => err ? reject(err) : resolve(res);
                node.send({ exe, id, data });
            }),
        };

        node.on('message', (data) => {
            const { id, res, err } = data;
            requests[id](err, res);
            delete requests[id];
        })

        res = `Is create ${name} context`;
    })()

    callback(err, res);
}