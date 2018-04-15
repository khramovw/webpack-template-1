const webpack = require('webpack');
const path = require('path');
const config = require('./gulp/config');
const styleLoader = require('style-loader');

// function createConfig( options, env ){}

let webpackConfig,
isProduction = true,
env = 'production';

// if (env === undefined) env = process.env.NODE_ENV;

// isProduction = env === 'production';
isProduction = 'production';

webpackConfig = {
    context: path.resolve(__dirname, config.src.js),
    entry: {
  plugin: './plugin.js',
},
    output: {
  path: path.resolve(__dirname, config.dest.js),
  filename: '[name].js',
  publicPath: 'js/',
},
    devtool: isProduction ? '#source-map' : '#cheap-module-eval-source-map',
    resolve: {
    extensions: ['.js'],
    alias: {
      TweenLite: path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      TimelineLite: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
    },
},
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, 
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, 
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    },
                    { 
                        loader: 'postcss-loader', 
                        options: { parser: 'sugarss', exec: true } 
                    }
                ]
            }
        ]
    }
} 


module.exports = webpackConfig;
// module.exports.createConfig = createConfig;
  
    
