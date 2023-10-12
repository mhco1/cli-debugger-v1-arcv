import { inspect } from 'util'
import vm from 'node:vm'
import global from './global.js'

export default (name = '') => {
    const { is, has } = module.tools.test;
    const d = data.context;
    if (!is.context.validFormat(name)) return [true, 'Invalid format to new context'];
    if (has.context(name)) return [true, 'There is already a context with this name'];
    d.c[name] = {
        global: vm.createContext(Object.assign(new Object(global), copyGlobal)),
        history: [],
    };
    return [false, `Is create ${name} context`]
}