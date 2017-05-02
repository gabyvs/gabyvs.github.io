'use strict';

import * as React from 'react';

import './navBar.styl';
import {ISection} from '../models/section';
import {Link} from './navigation';

export const NavBar = (props: { sections: ISection[] }) =>
    <div className="navbar">
        <ul className="nabbar-list">
            {
                props.sections.map(s => <li key={s.url}><Link href={s.url}>{s.displayText}</Link></li>)
            }
        </ul>
    </div>;
