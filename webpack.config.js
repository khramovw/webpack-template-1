const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devServer = require("webpack-dev-server");

// the path(s) that should be cleaned
let pathsToClean = [
    'build'
];

module.exports = (env, argv) => {
    let config = {
        entry: `./src/index.js` ,
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, './build'),
        },
        plugins: [
            new CleanWebpackPlugin(pathsToClean),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin(
                {
                    filename: "style.css",
                    chunkFilename: "[id].css"
                }
            ),
            new webpack.ProvidePlugin({
                jquery: 'jquery',
                $: "jquery",
                jQuery: "jquery"
            })

        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /\.less$/,
                    use: [{
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader" // compiles Less to CSS
                    }]
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'build'),
            open: true,
            compress: true,
            port: 3000
        }
    };

    if (argv.mode == 'production') {
        config.plugins.push(new UglifyJsPlugin({ sourceMap: false }));
        config.module.rules.push({
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
                "less-loader"
            ]
        });
        config.module.rules.push({
            test: /\.(png|jpg|gif)$/,
            use:
                [{
                    loader: 'file-loader',

                },
                    {
                    loader: 'image-webpack-loader',
                    options: {
                        name: '[path][name].[ext]',
                            bypassOnDebug: true,
                    },
                }]

        });


    } else if(argv.mode == 'development'){
        config.devtool = "source-map";
        config.module.rules.push({
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader,
                "css-loader",
                "less-loader"
            ]
        });
        config.module.rules.push({
            test: /\.(png|jpg|gif)$/,
            use:
                {
                    loader: 'file-loader',
                    options: {}
                }

        });
    }
    return config
}