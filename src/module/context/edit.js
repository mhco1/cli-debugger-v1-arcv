export default (name = '') => {
    const { is, has } = module.tools.test;
    const d = data.context;
    if (!is.context.validFormat(name)) return [true, 'Invalid format to new context'];
    if (has.context(name)) return [true, 'There is already a context with this name'];
    if (!is.context.select()) return [true, 'No context was selected']
    d.c[name] = d.c[d.now];
    delete d.c[d.now];
    d.now = name;
    return [false, `${name} context was edited`]
}