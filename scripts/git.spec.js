const git = require('./git');

describe('Stream FS', () => {
    it('Read Hash', done => {
        git.sha().subscribe(
            n => {
                expect(n.length).toBe(40);
                done();
            }
        );
    });

    it('Read Short Hash', done => {
        git.shortSha().subscribe(
            n => {
                expect(n.length).toBe(7);
                done();
            }
        );
    });

    it('Creation Date', done => {
        git.created('./package.json').subscribe(
            n => {
                expect(n).toBe(1411708565000); // it happens to be this one :)
                done();
            }
        );
    });
});
