const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: './app.js'
    },
    devServer: {
        port: 8080,
        contentBase: './public',
    },
    resolve:{
        extensions: ['.js', '.jsx', '.png'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "app.css"
        })
    ],
    module: {
        rules: [{
            test: /.js[x]?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/react','@babel/preset-env'],
                    plugins: ['transform-object-rest-spread']
                }
            }
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
            'file-loader',
            ],
           },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                { loader: 'css-loader', options: { url: false, sourceMap: true } }
            ]
        }, {
            test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
            loader: 'file'        
        }]
    }
}