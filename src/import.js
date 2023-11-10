import Path from 'path';

const imp = async (o, p, n) => {
    o[n.replaceAll(/\/|\-|\.|\\/g, '_')] = (await import(Path.resolve(root, 'src/module', p, `${n}.js`))).default;
};

const module = {};

module.tools = {};
await imp(module.tools, 'tools', 'accessRef');
// await imp(module.tools, 'tools', 'clear');

module.tools.test = {};
module.tools.test.has = {};
await imp(module.tools.test.has, 'tools/test/has', 'context');

module.tools.test.is = {};
await imp(module.tools.test.is, 'tools/test/is', 'error');
await imp(module.tools.test.is, 'tools/test/is', 'event');
await imp(module.tools.test.is, 'tools/test/is', 'object');

module.tools.test.is.context = {};
await imp(module.tools.test.is.context, 'tools/test/is/context', 'select');
await imp(module.tools.test.is.context, 'tools/test/is/context', 'validFormat');

export default module