var fs = require('fs');

module.exports = function (context, xmlZipBlob) {
    context.log('Node.js blob trigger function processed blob:', xmlZipBlob);
    context.log(`typeof xmlZipBlob:`, typeof xmlZipBlob);

    try {
        fs.writeFile('xmlZip.zip', xmlZipBlob, 'utf8', (err) => {
            if (err) {
                throw err;
            }

            context.log('saved blob to loal file called xmlZip.zip');
            context.done();
        });
    }
    catch (e) {
        context.log(e);
    }

    context.log('end of function, continue execution?');

    setTimeout(function () {
        context.log('timeout worked');
    }, 2000);
};