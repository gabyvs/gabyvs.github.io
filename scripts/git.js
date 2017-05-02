const proc = require('child_process');
const rx = require('rxjs');

const rxChildProc = (command) => new rx.Observable(obs => {
    proc.exec(command, (err, stdout) => {
        if (err) {
            obs.error(err);
        } else {
            obs.next(stdout);
            obs.complete();
        }
    })
});

const sha = () => rxChildProc('git rev-parse HEAD').map(s => s.toString().trim());

const shortSha = () => rxChildProc('git rev-parse --short HEAD').map(s => s.toString().trim());

const created = path => {
    return rxChildProc(`git log --diff-filter=A --follow --format=%aD -1 -- ${path}`)
        .catch(_ => rx.Observable.of(new Date()))
        .map(s => new Date(s.toString().trim()).valueOf())
};

const updated = path => rxChildProc(`git log --format=%aD -1 -- ${path}`)
    .catch(_ => rx.Observable.of(new Date()))
    .map(s => new Date(s.toString().trim()).valueOf());

module.exports = {
    sha: sha,
    shortSha: shortSha,
    created: created,
    updated: updated
};