var fs = require('fs');

module.exports = function (context, req, res) {
    context.log('function triggered');
    context.log(req);

    fs.writeFile('message.txt', 'Hello Node.js', (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
        context.done();
    });
}