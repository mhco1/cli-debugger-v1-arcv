export default {
    has: {
        context: (a) => data.context.c.hasOwnProperty(a),
    },

    is: {
        context: {
            select: () => data.context.now.length > 0,
            validFormat: (a) => {
                const reg = /^[A-z][A-z|0-9]*$/g;
                return [...a.matchAll(reg)].length > 0
            }
        }
    }
}