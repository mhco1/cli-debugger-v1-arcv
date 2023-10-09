export default (path, obj, first = 'main') => {
    const _obj = { [first]: obj }
    return [_obj, ...path].reduce((a, b) => a[b])
}