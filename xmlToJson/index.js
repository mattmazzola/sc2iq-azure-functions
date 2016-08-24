var fs = rquire('fs');

module.exports = function (context, xmlZipBlob) {
    context.log('Node.js blob trigger function processed blob:', xmlZipBlob);
    console.log(`typeof xmlZipBlob:`, typeof xmlZipBlob);

    fs.writeFile('xmlZip.zip', xmlZipBlob, (err) => {
        if (err) {
            throw err;
        }

        console.log('saved blob to loal file called xmlZip.zip');
    });

    context.done();
};