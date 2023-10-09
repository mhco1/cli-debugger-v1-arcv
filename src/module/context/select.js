export default (name = '') => {
    const { is, has } = module.tools.test;
    const d = data.context;
    if (!has.context(name)) return [true, 'Context not defined'];
    d.now = name;
    return [false, `Is select ${name} context`]
}