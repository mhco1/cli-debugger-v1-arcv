// const vorpal = require('vorpal')();

// vorpal
//   .command('foo', 'Outputs "bar".')
//   .action(function(args, callback) {
//     this.log('bar');
//     callback();
//   });

// vorpal
//   .delimiter('myapp$')
//   .show();

// function Scope() {
//   "use strict";
//   this.names = [];
//   this.eval = function(s) {
//     return eval(s);
//   };
// }

const copyGlobal = Object.assign(new Object(), global);

const context = (() => {r

    const is = {
        select: () => data.now.length > 0,
        validFormat: (name) => {
            const reg = /^[A-z][A-z|0-9]*$/g;
            return [...name.matchAll(reg)].length > 0
        }
    };

    const has = {
        context: (name) => {
            return data.c.hasOwnProperty(name)
        }
    };

    const data = {
        c: {}, now: '',
    }

    return {
        run(script = '') {
            if (!is.select()) throw Error('No context was selected');
            const name = data.now;
            const c = data.c[name][1];
            return vm.runInContext(script, c);
        },

        select(name = '') {
            if (!has.context(name)) throw Error('Context not defined');
            if (is.select()) data.c[data.now][0] = false;
            data.c[name][0] = true;
            data.now = name;
            return `Is select ${name} context`
        },

        new(name = '') {
            if (!is.validFormat(name)) throw Error('Invalid format to new context');
            if (has.context(name)) throw Error('Context has already been defined');
            const c = Object.assign(new Object(), copyGlobal);
            vm.createContext(c);
            data.c[name] = [false, c];
            return `Is create ${name} context`
        },

        del(name = '') {
            if (!has.context(name)) throw Error('Context not defined');
            delete data.c[name];
        },

        show: {
            data() {
                return data.c
            },
            select() {
                return data.now
            }
        }
    }
})();

const { promisify } = require('util')
const { Select } = require('enquirer');
const term = require('terminal-kit').terminal;
const asciify = require('asciify');
const _asciify = promisify(asciify);

term.clear();
_asciify('Debugger Tool', { color: "green", font: 'drpepper' })
    .then(res => term(res, '\n'))
    // .then( res => term('Select one opition','\n') )
    .then(res => (new Select({
        name: 'color',
        message: 'Pick a flavor',
        choices: ['apple', 'grape', 'watermelon', 'cherry', 'orange']
    })).run())
    .then(res => term('option: ', res, '\n'))
    .catch(err => term(err))