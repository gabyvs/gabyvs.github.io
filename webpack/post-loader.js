const blog = require('../scripts/blog');

module.exports = function(source) {
    // Setting the loader as cacheable.
    this.cacheable && this.cacheable();
    // Preparing loader as async
    const done = this.async();
    const mod = JSON.stringify(blog.parse(source));
    done(null, `module.exports = ${mod};`);

};
