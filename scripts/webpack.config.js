const path = require('path');
const HappyPack = require('happypack');
const os = require('os');

let config = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'components': path.join(__dirname, '..', 'app', 'vue', 'components')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: process.env.USE_HAPPYPACK ? 'happypack/loader' : 'babel-loader'
        }, {
            test: /\.(png|jpg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: 'assets/images/[hash:8].[ext]',
                    limit: 8192
                }
            }
        }, {
            test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: "url-loader",
                options: {
                    name: 'assets/fonts/[hash:8].[ext]',
                    limit: 10000
                }
            }
        }]
    },
    plugins: []
};

if (process.env.USE_HAPPYPACK) {
    config.plugins.push(new HappyPack({
        threads: 4,
        threadPool: HappyPack.ThreadPool({size: os.cpus().length}),
        loaders: ['babel-loader'],
        debug: true
    }))
}
module.exports = config;
