/* global __dirname */
/* global process */
// This file is our entry point for Node.js
const express = require('express');
const path = require('path');
const basePath = process.cwd();
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
const app = express();
const webpackSever = require('./webpack.server');

const port =  3000;

// We point our static assets to a dummy folder, so that when requesting for /build/* node doesn't use the built
// files in the real folder.
const publicPath = path.resolve(basePath, 'tmp');
app.use('/', express.static(publicPath));

// Use a special folder for images in posts:
app.use('/img/', express.static(path.resolve(basePath, 'img')));
// Use a special folder for fonts and styles:
app.use('/styles/', express.static(path.resolve(basePath, 'styles')));

// As we are using a dummy folder as our root, we need to set the path for index.html and other files explicitly.
// This is a bit of an issue, but I'm not expecting to add many static files anyway.
app.get('/', function(request, response){
    response.sendFile(path.resolve(basePath, 'index.html'));
});
app.get('/ico32.png', function(request, response){
    response.sendFile(path.resolve(basePath, 'ico32.png'));
});
app.get('/README.md', function(request, response){
    response.sendFile(path.resolve(basePath, 'README.md'));
});

webpackSever();

// Any requests to localhost:3000/build is proxied
// to webpack-dev-server
app.get('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
});
app.get(/\.hot-update\.json$/, function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
});
app.get(/^\/[^(?:build)].*/, function(request, response){
    response.sendFile(path.resolve(basePath, 'index.html'));
});

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});

// And run the server
app.listen(port, function () {
    console.log('Node server running at port %s and Webpack Server running at por 8080.', port);
});
