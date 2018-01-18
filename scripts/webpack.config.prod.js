const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const extract = (fallback, type = 'css') => {
    let use = ["css-loader", {
        loader: "postcss-loader",
        options: {
            config: {
                path: path.join(__dirname, 'dist', 'postcss.config.js')
            }
        }
    }];
    type === 'less' ? use.push('less-loader') : '';
    return ExtractTextPlugin.extract({
        fallback: fallback,
        use: use,
        publicPath: "../"
    })
};


module.exports = merge(webpackConfig, {
    entry: {
        'app': path.join(__dirname, '..', 'app', 'vue', 'index')
    },
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: 'script/app.[hash:8].js',
        publicPath: './'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: extract('vue-style-loader'),
                    less: extract('vue-style-loader', 'less')
                }
            }
        }, {
            test: /\.css/,
            use: extract('style-loader')
        }, {
            test: /\.less/,
            use: extract('style-loader', 'less')
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            __PROXY__: process.env.PROXY || false
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require(path.join(__dirname, '..', 'dll', 'manifest.json'))
        }),
        new ExtractTextPlugin({
            filename: "style/app.[hash:8].css",
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            compressor: {
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5,
            moveToParents: true
        }),
        new HtmlWebpackPlugin({
            title: 'vue通用开发环境',
            filename: 'index.html',
            template: path.join(__dirname, '..', 'app', 'index.html'),
            favicon: path.join(__dirname, '..', 'app', 'assets', 'images', 'favicon.ico')
        }),
        new AddAssetHtmlPlugin([{
            filepath: require('./util').vendorUrl('js'),
            outputPath: '../dist/script',
            publicPath: './script',
            includeSourcemap: false
        }, {
            filepath: require('./util').vendorUrl('css'),
            outputPath: '../dist/style',
            publicPath: './style',
            includeSourcemap: false,
            typeOfAsset: 'css'
        }].filter(item => item.filepath).map(item => {
            item.filepath = require.resolve(path.join(__dirname, '..', 'dll', item.filepath));
            return item;
        }))
    ]
});
