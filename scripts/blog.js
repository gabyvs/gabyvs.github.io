const streamFs = require('./streamFs');
const archive = require('./archive');
const ml = require('./blogml');
const md = require('markdown-it');
const fs = require('fs');
const path = require('path');
const pwd = process.cwd();

const postsPath = path.resolve(pwd, './posts');

const posts = () => archive(postsPath).all()
    .map(p => {
        const c = parse(p.content);
        p.content = c;
        p.title = c.title;
        return p;
    });

const reduceNodes = (tokens) => {
    const nodes = [];
    const chain = [];
    let current;
    tokens.forEach(t => {
        const type = t.type;
        if (ml.isBranch(type)) {
            if (current) { chain.push(current); }
            current = ml.build(t);
        }
        if (type =='inline') {
            current.bulkAppend(reduceNodes(t.children));
        }
        if (ml.isLeaf(type)) {
            const n = ml.build(t);
            if (!current) { nodes.push(n); }
            else { current.append(n); }
        }
        if (ml.isClose(type)) {
            if (chain.length > 0) {
                const c = current;
                current = chain.pop();
                current.append(c);
            } else {
                nodes.push(current);
                current = undefined;
            }
        }
    });
    return nodes;
};

const findTitle = (nodes) => {
    const n = nodes.find(n => n instanceof ml.Heading);
    return n ? n.rawText() : '';
};

const parse = (data) => {
    const env = {};
    const parser = new md('commonmark');
    const tokens = parser.parse(data, env);
    const nodes = reduceNodes(tokens);
    return {
        title: findTitle(nodes),
        children: nodes
    };
};

module.exports = {
    posts: posts,
    parse: parse
};
