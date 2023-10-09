export default (a) => {
    const reg = /^[A-z][A-z|0-9]*$/g;
    return [...a.matchAll(reg)].length > 0
}