export default (main) => () => {
    const { term } = main;
    const { context } = main.datas;

    for (const key in context.c) {
        context.c[key].node.kill();
    }

    term.processExit();
}