const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    // fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
    fs.write(fd, buf, 0, 'utf-8', function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
                );
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.dev.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        host: 'localhost',
        port: 8088,
        inline: true, // 实时刷新
        compress: true, // 使用热加载插件 HotModuleReplacementPlugin
        open: true,
        hot: true,
        hotOnly: true,
        proxy: {
            '/cms': {
                target: 'http://8.131.85.93:8080',
                pathRewrite: {
                    '^/cms': ''
                  },
                changeOrigin: true,
                secure: false
            }
        }
    }
});
