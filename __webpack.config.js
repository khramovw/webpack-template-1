const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



let webpackConf = {
    entry: './src/index.js',
    // devtool: 'source-map',
    output: {
        path: path.resolve(__dirname,'./dist/js/'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devServer: {
        overlay: true,
        contentBase: path.resolve(__dirname, './'),
        open: true,
        compress: true,
        port: 3000
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                enforce: true
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            }
        ]
    },
    
}

module.exports = (env, options) => {

    let prod = options.mode === 'production';

    webpackConf.devtool = prod ? false : 'eval-sourcemap';

    console.log(options.mode, prod, env);

    return webpackConf;

};