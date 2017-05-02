const blog = require('./blog');
const cli = require('./cli');
const path = require('path');
const moment = require('moment');
const streamFs = require('./streamFs');
const pwd = process.cwd();


const toMDLink = d => `* [${d.title}](${d.path}) (${moment(d.date).format('YYYY/MM/DD')})`;

const processTemplate = payload => payload
    .template
    .replace(/\{\{about\}\}/g, payload.about)
    .replace(/\{\{postList\}\}/g, payload.postList);

const writeReadme = postList => {
    const tPath = path.resolve(pwd, './templates/README.tmd');
    const rPath = path.resolve(pwd, './README.md');
    const aPath = path.resolve(pwd, './about.md');

    streamFs.readFile(aPath)
        .map(about => { return { about: about, postList: postList }})
        .flatMap(payload => {
            return streamFs.readFile(tPath).map(template => {
                payload.template = template;
                return payload;
            })
        })
        .map(processTemplate).flatMap(text => streamFs.writeFile(rPath, text))
        .subscribe(() => {
            cli.log('Readme file generated successfully.');
        });
};

blog.posts()
    .toArray().subscribe(data => {
        const list = data
            .sort((a,b) => b.date.valueOf() - a.date.valueOf())
            .map(toMDLink).
            join('\n');

        writeReadme(list);
    });


