export default ({ acorn }) => (fn = () => { }) =>
    acorn.parse(`(${fn.toString()})`)
    .body[0].expression.params
    .map(el => el.name || el.left.name)