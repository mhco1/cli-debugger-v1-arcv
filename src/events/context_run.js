export default (script = '', callback) => {
    let res, err;
    const { is } = modules.test;
    const { context } = datas;

    if (!is.context.select()) {
        err = Error('No context was selected');
        return callback(err, res);
    };

    const { send } = context.c[context.now];

    (async () => {
        const res = (await send('eval', { script })).result;
        if (/string|number|boolean/g.test(res.type)) return res.value;
        if (res.type == 'function') return () => { };
        if (res.type == 'object') {
            const _res = res.subtype == 'array' ? [] : {};

            const props = (await send('props', { id: res.objectId })).result;
            props.forEach(({ name, value }) => {
                _res[name] = /string|number|boolean/g.test(value.type) ? value.value : value.type == 'object' ? value.subtype == 'array' ? [] : {} : value.type == 'function' ? () => { } : undefined;
            })

            return _res
        }
    })()
        .then(res => callback(undefined, res))
        .catch(err => callback(err, undefined))
}