'use strict';

import * as React from 'react';

import {NavBar} from './blogml/navBar';
import {Posts, PostView, MdView} from './blogml/posts';
import {Archive} from './blogml/archive';
import {Post} from './models/post';

declare const require;
const about = require('../about-text.md');

const sections = [
    { url: '/', displayText: 'Recent' },
    { url: '/about', displayText: 'About' },
    { url: '/archive', displayText: 'Archive' }
];

const rPost = /^\/posts\/([^\/]+)$/;

const About = () => {
    return (
        <div className="aboutBlock content">
            <MdView node={about} />
            <div className="profile-icons">
                <a href="https://github.com/gabyvs"><img className="github-icon" alt="GitHub" src="../img/GitHub-Mark-32px.png"/></a>
                <a href="https://www.linkedin.com/in/gabriela-v%C3%A1zquez-95707b27/"><img className="linkedin-icon" alt="LinkedIn" src="../img/Logo-Black-28px-TM.png"/></a>
            </div>
        </div>
    );
};

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
