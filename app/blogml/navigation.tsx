import * as React from 'react';
import {onNavTo} from '../router';

export const Link = (props: { children?: any, href: string }) =>
    <a onClick={onNavTo(props.href)} className="router-link">{ props.children }</a>;