export default {
    print: (...a) => {
        const op = {
            colors: true,
            showProxy: true,
        }
        const b = a.map(el => [inspect(el, op), '\n',]).flat();
        term(...b)('\n')
    },
}