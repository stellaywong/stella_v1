const path = require('path');

module.exports = {

    mode: 'development',
    context: __dirname,
    devtool: 'source-map',
    entry: './src/widgets.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.js?$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env', '@babel/react']
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '*']
    }
};