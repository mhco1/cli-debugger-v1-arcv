export default async (name = '', callback) => {
    let res, err;
    const { childProcess, path } = modules.builtin;
    const { is, has } = modules.test;
    const { context } = datas;

    (() => {
        if (!is.context.validFormat(name)) return (err = 'Invalid format to new context')
        if (has.context(name)) return (err = 'There is already a context with this name');

        const dir = path.resolve(process.env.ROOT, 'src/server.js');
        const node = childProcess.fork(dir, {
            env: {
                NAME: name,
            }
        });

        const proto = context.c[name] = {
            node,
            history: [],
            requests: {},
        };

        node.on('message', (data) => {
            const { id, res } = data;
            proto.requests[id](undefined, res);
        })

        res = `Is create ${name} context`;
    })()

    callback(err, res);
}