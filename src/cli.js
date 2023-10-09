import Terminal from "terminal-kit";
import EventEmitter from "events";
// import * as Events from './modules/events/index.js';
// import { modules } from '#src/import.js';

const test = () => term('test ok\n')

globalThis.copyGlobal = Object.assign({}, globalThis);
globalThis.module = (await import('#src/import.js')).default
globalThis.data = (await import('#src/data.js')).default;
globalThis.events = new EventEmitter();
globalThis.term = Terminal.terminal;

term.clear();

term.on('key', (name, matches, data) => {
    if (name == 'CTRL_C') process.exit();
    if (name == 'CTRL_T') debugger;
})

for (const key in module.events) {
    const el = module.events[key];
    events.on(...el)
}

events.on('e_test', test);

export default async (arg) => {
    // const Repl = (await import('./modules/repl.js')).default();
    // const menu = (await import('./modules/menu.js')).default();

    // Menu.setMenu({
    //     aaa: 'e_test',
    //     bbb: 'e_test',
    //     ccc: {
    //         ddd: 'e_test',
    //         eee: 'e_test',
    //         fff: {
    //             ggg: 'e_test',
    //             hhh: 'e_test'
    //         }
    //     }
    // })

    // term.table([
    //     ['header #1', 'header #2', 'header #3'],
    //     ['row #1', 'a much bigger cell, a much bigger cell, a much bigger cell... ', 'cell'],
    //     ['row #2', 'cell', 'a medium cell'],
    //     ['row #3', 'cell', 'cell'],
    //     ['row #4', 'cell\nwith\nnew\nlines', term('ok')]
    // ], {
    //     // hasBorder: false ,
    //     // contentHasMarkup: true ,
    //     // textAttr: { bgColor: 'default' } ,
    //     // firstCellTextAttr: { bgColor: 'blue' } ,
    //     // firstRowTextAttr: { bgColor: 'yellow' } ,
    //     // firstColumnTextAttr: { bgColor: 'red' } ,
    //     // checkerEvenCellTextAttr: { bgColor: 'gray' } ,
    //     width: 60,
    //     // fit: true   // Activate all expand/shrink + wordWrap
    // }
    // );
    // aevents.emit('e_replContextMenu');
    // events.emit('e_menu', {
    //     aaa: 'e_test',
    //     bbb: 'e_test',
    //     ccc: {
    //         ddd: 'e_test',
    //         eee: 'e_test',
    //         fff: {
    //             ggg: 'e_test',
    //             hhh: 'e_test'
    //         }
    //     }
    // });
    // Menu.start();
    // term(events.eventNames().join('\n'),'\n')
    events.emit('e_start');
}