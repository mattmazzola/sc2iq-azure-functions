var fs = require('fs');

module.exports = function (context, xmlZipBlob) {
    context.log('Node.js blob trigger function processed blob:', xmlZipBlob);
    context.log(`typeof xmlZipBlob:`, typeof xmlZipBlob);

    fs.writeFile('xmlZip.zip', xmlZipBlob, (err) => {
        if (err) {
            throw err;
        }

        context.log('saved blob to loal file called xmlZip.zip');
        context.done();
    });
};