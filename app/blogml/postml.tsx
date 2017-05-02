import * as React from 'react';
import {Post} from '../models/post';
import {IHeading, ILeaf, IBranch, IImage, ILink, INode} from './blogml';
import {} from './codeBlock';
import {CodeInline, CodeBlock} from "./codeBlock";
import {CodeFenced} from "./codeBlock";

const Heading = (node: IHeading, index: string) =>
    React.createElement('h' + node.h, { key: index }, nodeToTags(node, index));

const Text = (node: ILeaf, index: string) => <span key={index}>{node.content}</span>;

const Paragraph = (node: IBranch, index: string) => <p key={index}>{ nodeToTags(node, index) }</p>;

const Emphasis = (node: IBranch, index: string) => <em key={index}>{ nodeToTags(node, index) }</em>;

const TextStrong = (node: IBranch, index: string) => <strong key={index}>{ nodeToTags(node, index) }</strong>;

const Image = (node: IImage, index: string) => {
    const attrs = node.attrs || {};
    attrs.key = index;
    attrs.alt = node.content;
    return React.createElement('img', attrs)
};

const BulletList = (node: IBranch, index: string) => <ul key={index}>{ nodeToTags(node, index) }</ul>;

const ListItem = (node: IBranch, index: string) => <li key={index}>{ nodeToTags(node, index) }</li>;

const Link = (node: ILink, index: string) => {
    const attrs = node.attrs;
    attrs.key = index;
    return React.createElement('a', attrs, nodeToTags(node, index))
};

const PostLink = (post: Post) => <a href={post.path}>{post.title}</a>;

const tags = {
    'heading': Heading,
    'text': Text,
    'paragraph': Paragraph,
    'link': Link,
    'em': Emphasis,
    'code_inline': CodeInline,
    'bullet_list': BulletList,
    'list_item': ListItem,
    'code_block': CodeBlock,
    'image': Image,
    'strong': TextStrong,
    'fence': CodeFenced
};

const getTag = (node: INode, index: string) => {
    const tag = tags[node.type];
    if (tag) return tag(node, index);

    console.log(node.type, node);
    return <span key={index}>Unsupported Node Type</span>;
};

export const nodeToTags = (node: IBranch, index: string) => node.children.map((n, i) => getTag(n, index + '-' + i));
