'use strict';

import * as React from 'react';

import {NavBar} from './blogml/navBar';
import {Posts, PostView, MdView} from './blogml/posts';
import {Archive} from './blogml/archive';
import {Post} from './models/post';

declare const require;
const about = require('../about.md');

const sections = [
    { url: '/', displayText: 'Recent' }, // TODO: change this
    { url: '/about', displayText: 'About' },
    { url: '/archive', displayText: 'Archive' }
];

const rPost = /^\/posts\/([^\/]+)$/;

const About = () =>  <div className="aboutBlock content"><MdView node={about} /></div>;

const NoMatch = () => (<h1>404!</h1>);

const routeElement = (posts: Post[], path: string) => {
    if (path === '/') return <Posts posts={ posts } />;
    if (path === '/about') return <About />;
    if (path === '/archive') return <Archive posts={posts} />;

    if (rPost.test(path)) {
        const nPath = path.substr(1);
        const post =  posts.filter(p => p.path === nPath);
        if (post && post.length > 0) {
            return <PostView post={post[0]} />;
        }

    }
    return <NoMatch />;
};

export const App = (props: { posts: Post[], path: string }) => {
    return (
        <div>
            <NavBar sections={sections} />
            <div className="container-fluid">
                { routeElement(props.posts, props.path) }
            </div>
            <div className="footer"></div>
        </div>
    );
};
