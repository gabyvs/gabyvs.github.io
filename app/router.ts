import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'

interface ILocation {
    hash: string;
    href: string;
    host: string;
}

interface IWindow {
    addEventListener(string, Function, boolean): void;
    onpopstate: Function;
    location: ILocation;
}

const rHash = /^#(.*)$/;

const getPath = (win: IWindow): string => {
    const hash = win.location.hash;
    if (!hash) {
        // It may be using history API
        const host = win.location.host;
        const href = win.location.href;
        return href.substr(href.indexOf(host) + host.length);
    }
    const ms = rHash.exec(hash);
    if (!ms) { return hash }
    return ms[1] || '/';
};

const navigationListener = new Subject<string>();

let lastPath = '';
const isDistinct = (path) => {
    const r = lastPath !== path;
    if (r) { lastPath = path; }
    return r;
};

export const onNavTo = (href: string) => event => { navigateTo(href) };

export const navigateTo = (href: string) => {
    navigationListener.next(href);
    window.history.pushState(href, '', href);
};

export class HashListener extends Observable<string> {
    constructor(win: IWindow) {
        //noinspection TypeScriptValidateTypes
        super(subscriber => {
            // Emit as soon as you get a subscriber
            subscriber.next(getPath(win));
            win.addEventListener('hashchange', () => {
                subscriber.next(getPath(win));
            }, false);
        });
    }
}

export class HistoryListener extends Observable<string> {
    constructor(win: IWindow) {
        //noinspection TypeScriptValidateTypes
        super(subscriber => {
            subscriber.next(getPath(win));
            win.onpopstate = event => {
                subscriber.next(getPath(win));
            };
        });
    }
}

export const listenNavigation = (win: IWindow) =>
    navigationListener.asObservable().merge(new HashListener(win)).merge(new HistoryListener(win)).filter(isDistinct);
