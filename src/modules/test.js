export default (main) => ({
    has: {
        context: (v) => main.datas.context.c.hasOwnProperty(v),
    },

    is: {
        context: {
            select: () => main.datas.context.now.length > 0,
            validFormat: (v) => (/^[A-z][A-z|0-9]*$/g).test(v)
        },

        repl: {
            command: (v) => (v[0] == '.')
        }
    }
})