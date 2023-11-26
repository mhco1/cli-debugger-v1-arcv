export default {
    has: {
        context: (v) => datas.context.c.hasOwnProperty(v),
    },

    is: {
        context: {
            select: () => datas.context.now.length > 0,
            validFormat: (v) => (/^[A-z][A-z|0-9]*$/g).test(v)
        }
    }
}