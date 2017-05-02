function log () {
    const aLength = arguments.length;
    if (aLength === 0) { return; }
    let i = 0;
    const args = [];
    while (i < aLength) {
        args.push(arguments[i].toString());
        i++;
    }
    console.log(`[blog] ${args.join(' ')}`);
}

module.exports = {
    log: log
};
