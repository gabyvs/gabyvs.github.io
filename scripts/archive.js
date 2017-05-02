const fs = require('./streamFs');
const git = require('./git');
const path = require('path');
const pwd = process.cwd();

const relativePath = p => path.resolve(pwd, p).substr(pwd.length + 1);

const fileName = p => {
    const fName =  p.substr(p.lastIndexOf('/') + 1);
    return fName.substring(0, fName.lastIndexOf('.'))
};

const mdExt = /\.md$/;

const archive = path => ({
    all: () => fs.traverse(path)
        .filter(p => mdExt.test(p))
        .flatMap(p => fs.readFile(p)
            .map(c => ({ localPath: p, path: relativePath(p), fileName: fileName(p), content: c})))
        .flatMap(p => git.created(p.path).map(c => { p.date = c; return p; }))
        .flatMap(p => git.updated(p.path).map(c => { p.modifiedAt = c; return p; }))
});

module.exports = archive;