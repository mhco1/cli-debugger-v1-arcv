export default (name = '', callback) => {
    let res, err
    const { is, has } = modules.test;
    const { context } = datas;

    (() => {
        if (!has.context(name)) return (err = 'Context not defined');
        context.now = name;
        res = (`Is select ${name} context`)
    })()

    return callback(err, res);
}