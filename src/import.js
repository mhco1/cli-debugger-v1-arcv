const path = require('path');
const imp = (path) => require(path.resolve(root, 'src/modules', path));

export default {
    test: imp('test.js').default,
    tools:{
        accessRef: imp('accessRef').default,
        // clear: imp('clear').default,
    }
}