export default (main) => async () => {
    const { events, term } = main;
    const { asciify } = main.modules.builtin;
    const { toPromise } = main.modules.tools;

    const asciify2 = toPromise(asciify);
    const title = await asciify2(pkg.name, { color: "green", font: 'drpepper' });

    term(title, '\n');
    term("Type '.help' for more information\n");
    term("Press CTRL+C or type .exit to exit \n");
    events._.repl.run();
}