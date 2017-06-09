var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/js/index',
    output: {
        filename: 'bundle.js',
        publicPath: '/public/js/'
    },
    resolve: {
        extensions: ['','.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    }
};