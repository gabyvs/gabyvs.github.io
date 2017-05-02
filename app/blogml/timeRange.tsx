import * as React from 'react';

type PostRange = { created: number, updated: number }

const isToday = (date: Date) => {
    const today = new Date();
    if(today.valueOf() - date.valueOf() >= 24*60*60*1000) return false;
    return date.getDate() === today.getDate();
};

const isThisYear = (date: Date) => date.getFullYear() === new Date().getFullYear();

const isSameYear = (a: Date, b: Date) => a.getFullYear() === b.getFullYear();

const isSameDay = (a: Date, b: Date) => isSameYear(a, b) && a.getMonth() === b.getMonth() && a.getDate() && b.getDate()

const Today = () =>  <div className="timestamp">Written Today</div>;

const MonthDate = (props: {date: Date}) => {
    const month = props.date.toLocaleDateString('en-US', { month: 'long'});
    return <div className="timePart"><span className="month">{month}</span> <span className="day">{props.date.getDate()}</span></div>
};

const ThisYear = (props: PostRange) => {
    const created = new Date(props.created);
    const updated = new Date(props.updated);
    if (isSameDay(created, updated)) {
        return <div className="timestamp">Written <MonthDate date={ created } /></div>;
    } else {
        return <div className="timestamp">Written <MonthDate date={ created } />, updated <MonthDate date={ updated } /></div>;
    }
};

const SameYear = (props: PostRange) => {
    const created = new Date(props.created);
    const updated = new Date(props.updated);
    if (isSameDay(created, updated)) {
        return <div className="timestamp">Written <MonthDate date={ created} />, <span className="year">{created.getFullYear()}</span></div>;
    } else {
        return <div className="timestamp">Written in <span className="year">{created.getFullYear()}</span> at <MonthDate date={ created } /> and updated <MonthDate date={ updated } /></div>;
    }
};

const Range = (props: PostRange) => {
    const created = new Date(props.created);
    const updated = new Date(props.updated);
    return <div className="timestamp">Written <MonthDate date={ created } />, <span className="year">{created.getFullYear()}</span>; updated <MonthDate date={ updated } />, <span className="year">{updated.getFullYear()}</span></div>;
};

export const TimeRange = (props: { created: number, updated: number }) => {
    const created = new Date(props.created);
    const updated = new Date(props.updated);
    if (isToday(created)) return Today();
    if (isThisYear(created)) return ThisYear(props);
    if (isSameYear(created, updated)) return SameYear(props);
    return Range(props);
};