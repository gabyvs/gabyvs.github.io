'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'es6-shim/es6-shim.min'

import {App} from './app';

import {listenNavigation} from './router'

import './main.styl';

declare const require;
const content = require("./blog.json");

const historyListener = listenNavigation(window);

historyListener
    .map(path => <App posts={content.posts} path={path}></App>)
    .subscribe(app => { ReactDOM.render(app, document.getElementById('app')); });