
const sanitizeType = (type) => isBranch(type) ? type.substr(0, type.length - 5) : type;

const isBranch = (type) => type.endsWith('_open');

const isClose = (type) => type.endsWith('_close');

const leafNodes = ['text', 'code_inline', 'code_block', 'fence', 'image'];

const isLeaf = (type) => leafNodes.indexOf(type) >= 0;

const buildBranch = (token) => {
    const type = sanitizeType(token.type);
    if (type === 'link') return new Link(token.attrs);
    if (type === 'heading') return new Heading(token.tag.substr(1));
    return new Branch(type);
};

const remakeText = s => s.replace(/^([^\.,\?!])/, ' $1').replace(/(\w+)'(s|t|m|ve)/g, '$1\u2019$2');

const buildLeaf = (token) => {
    const type = token.type;
    const content = token.content;
    if (type === 'fence') return new Fence(token.info, content);
    if (type === 'image') { return new Image(token.attrs, content); }
    if (type === 'text') { return new Leaf(type, remakeText(content)); }
    return new Leaf(type, content);
};

const build = (token) => isBranch(token.type) ? buildBranch(token) : buildLeaf(token);

class Node {
    constructor (type) { this.type = type; }
    rawText () { return this.type; }
}

class Branch extends Node {
    constructor (type) {
        super(type);
        this.children = [];
    }
    append (node) { this.children.push(node); }
    bulkAppend (nodes) { (nodes || []).forEach(n => { this.append(n); })}
    rawText () { return this.children.map(n => n.rawText()).join(' '); }
}

class Leaf extends Node {
    constructor (type, content) {
        super(type);
        this.content = content;
    }

    rawText () { return this.content; }
}

class Link extends  Branch {
    constructor (attrs) {
        super('link');
        if (attrs && attrs.length > 0) {
            this.attrs = {};
            attrs.forEach(a => { this.attrs[a[0]] = a[1]; });
        }
    }
}

class Heading extends  Branch {
    constructor (level) {
        super('heading');
        this.h = level;
    }
}

class Fence extends Leaf {
    constructor (lang, content) {
        super('fence', content);
        this.lang = lang;
    }
}

class Image extends  Leaf {
    constructor (attrs, content) {
        super('image', content);
        if (attrs && attrs.length > 0) {
            this.attrs = {};
            attrs.forEach(a => { this.attrs[a[0]] = a[1]; });
        }
    }
}


module.exports = {
    Branch: Branch,
    Leaf: Leaf,
    Heading: Heading,
    isBranch: isBranch,
    isClose: isClose,
    isLeaf: isLeaf,
    build: build
};
