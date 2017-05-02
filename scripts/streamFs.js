'use strict';

const cli = require('./cli');
const fs = require('fs');
const rx = require('rxjs');

// Lets tart binding lstat and readDir from FS to streams:
const lstat = rx.Observable.bindNodeCallback(fs.lstat);
const readDir = rx.Observable.bindNodeCallback(fs.readdir);
const readFile = path => rx.Observable.bindNodeCallback(fs.readFile)(path, 'utf8');
const writeFile = (path, data) => rx.Observable.bindNodeCallback(fs.writeFile)(path, data);

const traverse = path => lstat(path)
    .flatMap(s => {
        //
        if (s.isDirectory()) {
            // We are in a directory and we need to read its content
            return readDir(path)
                .flatMap(a => rx.Observable.from(a)) // we transform the array into another stream
                .flatMap(p => traverse(`${path}/${p}`)); // and recurse
        }
        return rx.Observable.of(path);
    });

module.exports = {
    traverse: traverse,
    readFile: readFile,
    writeFile: writeFile,
    readDir: readDir
};
