export default (script = '', callback) => {
    let res, err;
    const { uuid } = modules.tools;
    const { is } = modules.test;
    const { context } = datas;

    if (!is.context.select()) {
        err = Error('No context was selected');
        return callback(err, res);
    };

    const id = uuid();
    const { requests, node } = context.c[context.now];

    requests[id] = callback;

    node.send({
        exe: 'eval',
        script,
        id,
    })
}