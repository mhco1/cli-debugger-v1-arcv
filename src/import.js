import Path from 'path';

const imp = async (o, p, n) => {
    o[n.replaceAll(/\/|\-|\.|\\/g, '_')] = (await import(Path.resolve(root, 'src/module', p, `${n}.js`))).default;
};

const module = {};

module.events = {};
await imp(module.events, 'events', 'menu');
await imp(module.events, 'events', 'start');
await imp(module.events, 'events', 'end');
await imp(module.events, 'events', 'repl/create');
await imp(module.events, 'events', 'repl/delete');
await imp(module.events, 'events', 'repl/edit');
await imp(module.events, 'events', 'repl/run');
await imp(module.events, 'events', 'repl/menu/context');
await imp(module.events, 'events', 'repl/menu/option');

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

module.context = {};
await imp(module.context, 'context', 'del');
await imp(module.context, 'context', 'edit');
await imp(module.context, 'context', 'new');
await imp(module.context, 'context', 'run');
await imp(module.context, 'context', 'select');
await imp(module.context, 'context', 'show');
// await imp(module.context, 'context', 'start');

export default module