export default (name = '') => {
    const d = data.context;
    delete d.c[d.now];
    d.now = '';
    return [false, `${name} context was deleted`]
}