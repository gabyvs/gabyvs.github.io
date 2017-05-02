const blog = require('../scripts/blog');

module.exports = function(source) {
    // Setting the loader as cacheable.
    this.cacheable && this.cacheable();
    // Preparing loader as async
    const done = this.async();

    blog.posts().toArray().subscribe(
        data => {
            data.forEach(p => { this.addDependency(p.localPath); });
            const posts = data
                .map(p => ({
                    path: p.path,
                    fileName: p.fileName,
                    title: p.title,
                    date: p.date,
                    content: p.content,
                    modifiedAt: p.modifiedAt
                }))
                .sort((a,b) => b.date.valueOf() - a.date.valueOf());
            const jsonString = JSON.stringify({ posts: posts });
            done(null, `module.exports = ${jsonString};`);
        });
};
