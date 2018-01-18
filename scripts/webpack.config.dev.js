const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('./webpack.config.js');
const merge = require('webpack-merge');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const styleUse = (type = 'css') => {
    let use = [{
        loader: "style-loader"
    }, {
        loader: "css-loader",
        options: {
            sourceMap: true
        }
    }, {
        loader: "postcss-loader",
        options: {
            sourceMap: true,
            config: {
                path: path.join(__dirname, 'dist', 'postcss.config.js')
            }
        }
    }];
    type === 'less' ? use.push({
        loader: "less-loader",
        options: {
            sourceMap: true
        }
    }) : '';
    return use;
};

module.exports = merge(webpackConfig, {
    devtool: 'source-map',
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        path.join(__dirname, '..', 'app', 'vue', 'index')
    ],
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.css/,
            use: styleUse('css')
        }, {
            test: /\.less/,
            use: styleUse('less')
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            },
            __PROXY__: process.env.PROXY || false
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require(path.join(__dirname, '..', 'dll', 'manifest.json'))
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: 'vue通用开发环境',
            filename: 'index.html',
            template: path.join(__dirname, '..', 'app', 'index.html')
        }),
        new AddAssetHtmlPlugin([{
            filepath: require('./util').vendorUrl('js')
        }, {
            filepath: require('./util').vendorUrl('css'),
            typeOfAsset: 'css'
        }].filter(item => item.filepath).map(item => {
            item.filepath = require.resolve(path.join(__dirname, '..', 'dll', item.filepath));
            item.includeSourcemap = false;
            return item;
        }))
    ]
});