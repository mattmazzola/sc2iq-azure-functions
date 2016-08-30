var fs = require('fs');

module.exports = function (context, req, res) {
    context.log('function triggered');
    context.log(req);

    
    context.done();
}