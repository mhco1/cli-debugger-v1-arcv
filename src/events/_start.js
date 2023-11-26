export default async () => {
    const { asciify } = modules.builtin;
    const { toPromise } = modules.tools;

    const asciify2 = toPromise(asciify);
    const title = await asciify2(pkg.name, { color: "green", font: 'drpepper' });
    
    term(title, '\n');
    term("Type '.help' for more information\n");
    term("Press CTRL+C or type .exit to exit \n");
    events.emit('repl_run');
}