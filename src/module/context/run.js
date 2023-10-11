import vm from 'node:vm'

export default (script = '') => {
    const { is } = module.tools.test;
    const d = data.context;

    if (!is.context.select()) return [true, 'No context was selected'];

    let res;
    const name = d.now;
    const g = d.c[name].global;

    try {
        res = vm.runInContext(script, g);
    } catch (err) {
        return [true, err.message]
    }
    return [false, res]
}