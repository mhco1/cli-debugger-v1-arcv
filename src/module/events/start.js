import { promisify } from 'util'
import Asciify from "asciify";

const asciify = promisify(Asciify);
const e_name = 'e_start';

export default [e_name, async () => {
    const res = await asciify('Debugger Tool', { color: "green", font: 'drpepper' })
    term(res, '\n');
    term("Type '.help' for more information\n");
    term("Press CTRL+C or type .exit to exit \n");
    events.emit('e_repl_run')
}]