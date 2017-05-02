const archive = require('./archive')('./scripts/mocks');

describe('Archive', () => {
    it('All Posts', done => {
        archive.all().filter(p => p.fileName === 'p1').subscribe(
            p => {
                expect(p.fileName).toBe('p1');
                done();
            }
        );
    });
});
