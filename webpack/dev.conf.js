/* global require */
// Import base conf and modify it to fit the build process.

const webpack = require('webpack');
const conf = require('./base.conf');

conf.devtool = 'source-map';

// Add Webpack Dev Server and Hot Dev Server
conf.entry = [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080'
].concat(conf.entry);

conf.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = conf;
