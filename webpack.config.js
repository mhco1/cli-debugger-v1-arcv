require('dotenv').config();
const path = require('path');

module.exports = {
    entry: './src/cli.js',
    mode: 'development',
    devtool: false,
    output: {
        filename: 'cli.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [],
    },
    // plugins: [new UglifyJSPlugin()]
};