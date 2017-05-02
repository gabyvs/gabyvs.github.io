const bml = require('./blogml');

describe('BlogML', () => {
    it('Node type ending in _open is a branch', () => {
        const nType = 'some_name_open';
        expect(bml.isBranch(nType)).toBe(true);
    });
});
