export interface IGrammar {
    comment?: RegExp;
    paren?: RegExp;
    keyword?: RegExp;
    arrow?: RegExp;
    operator?: RegExp;
    boolean?: RegExp;
    number?: RegExp;
    literal?: RegExp;
    member?: RegExp;
    string?: RegExp
    space: RegExp;
    text: RegExp;
}

export const jsGrammar: IGrammar = {
    comment: /^(?:\/\/[^\n]*\n|\/\*(?:.|\s)*\*\/)/,
    paren: /^\(|\)\[\]\{\}/,
    keyword: /^(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)(?=\b)/,
    arrow: /^=>/,
    operator: /^(?:--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}|\.)/,
    boolean: /^(?:true|false)/,
    number: /^\d+(?:.\d+)?/,
    literal: /^[A-Za-z_]\w*(?=\.)/,
    member: /^[A-Za-z_]\w*(?=\(|\[)/,
    string: /^(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    space: /^\s+/,
    text: /^[^\s]+/
};