const e_name = 'e_menu';

export default [e_name, async (obj = {}, options = { oneLineItem: true }, path = ['menu']) => {
    const { accessRef, clear, test: { is } } = module.tools;

    const back = '<< back';
    const ref = accessRef(path, obj, 'menu');
    const itens = [back, ...Object.keys(ref)];

    term(path.join(' > '));
    const key = (await term.singleColumnMenu(itens, options).promise).selectedText;
    const value = ref[key];

    clear(itens.length + 1);

    if (key == back) {
        path.pop();
        events.emit(e_name, obj, options, path);
        return
    }

    if (is.object(value)) {
        path.push(key);
        events.emit(e_name, obj, options, path);
        return
    }

    if (
        is.error(typeof value == 'string', 'Value is not a object or string')
        && is.error(is.event(value), `"${value}" event is undefinied`)
    ) {
        events.emit(value);
        return
    }
}]