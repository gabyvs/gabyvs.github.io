const fs = require('./streamFs');

describe('Stream FS', () => {
    it('Read directory', done => {
        fs.readDir('.')
            .subscribe(
                n => {
                    expect(n.indexOf('package.json')).toBeGreaterThan(0);
                    done()
                }
            );
    });

    it('Read file', done => {
        fs.readFile('./package.json')
            .subscribe(
                n => {
                    const j = JSON.parse(n);
                    expect(j.name).toBe('wigahluk-page');
                    done()
                }
            );
    });

    it('Traverse', done => {
        fs.traverse('./app')
            .toArray()
            .subscribe(
                n => {
                    expect(n.indexOf('./app/models/post.ts')).toBeGreaterThan(0);
                    done();
                }
            );
    });
});
