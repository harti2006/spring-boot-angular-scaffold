'use strict';

var webpack = require("webpack");

module.exports = {
    context: __dirname + '/app',
    entry: {
        "vendor": "./vendor",
        "app": "./main"
    },
    output: {
        path: __dirname + '/target/classes/static/js',
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: ['', ".webpack.js", ".web.js", '.js', '.ts']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.ts/,
                loader: 'ts-loader',
                query: {'ignoreDiagnostics': [2304  /* 2305 -> Cannot find 'Map'*/]},
                exclude: /(node_modules|target)/
            }
        ]
    },
    devServer: {
        port: 8081,
        proxy: {
            '/api/*': {
                target: 'http://localhost:8080'
            },
            '/session': {
                target: 'http://localhost:8080'
            },
            '/logout': {
                target: 'http://localhost:8080'
            }
        }
    }
};
