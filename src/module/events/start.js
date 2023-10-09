import { promisify } from 'util'
import Asciify from "asciify";

const asciify = promisify(Asciify);
const e_name = 'e_start';

export default [e_name, async () => {
    const res = await asciify('Debugger Tool', { color: "green", font: 'drpepper' })
    term(res, '\n');
    events.emit('e_repl_menu_context')
}]