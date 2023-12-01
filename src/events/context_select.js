export default (main) => (name = '', callback) => {
    let res, err;
    const { has } = main.modules.test;
    const { context } = main.datas;

    (() => {
        if (!has.context(name)) return (err = 'Context not defined');
        context.now = name;
        res = (`Is select ${name} context`)
    })()

    return callback(err, res);
}