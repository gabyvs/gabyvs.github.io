import * as React from 'react';
import {ILeaf, IFenced} from './blogml';
import {jsLexer} from './colorlex/lexer';

export const CodeInline = (node: ILeaf, index: string) => <code key={index}>{ node.content }</code>;

export const CodeBlock = (node: ILeaf, index: string) => <pre key={index}><code>{ node.content }</code></pre>;

export const CodeFenced = (node: IFenced, index: string) => {
    const tokens = jsLexer.lex(node.content);
    const spans = tokens.map((t, idx) => <span className={t.type} key={idx}>{t.v}</span>);
    return <pre key={index} className="fenced">
        { spans }
    </pre>;
};
