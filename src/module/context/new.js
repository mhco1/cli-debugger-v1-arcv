import vm from 'node:vm'

export default (name = '') => {
    const { is, has } = module.tools.test;
    const d = data.context;
    if (!is.context.validFormat(name)) return [true, 'Invalid format to new context']
    if (has.context(name)) return [true, 'There is already a context with this name']
    const c = Object.assign(new Object(), copyGlobal);
    vm.createContext(c);
    d.c[name] = c;
    return [false, `Is create ${name} context`]
}