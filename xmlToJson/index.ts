import * as fs from 'fs';
import * as path from 'path';

export function xml2json(context: any, xmlZipBlob: any) {
    context.log('Node.js blob trigger function processed blob:', xmlZipBlob);
    context.log(`typeof xmlZipBlob:`, typeof xmlZipBlob);

    var tempDirectory = process.env["TMP"];
    var tempFileName = "xmlZip.zip";
    var fileDestination = path.join(tempDirectory, tempFileName);

    context.log('Writing blob file to: ', fileDestination);

    fs.writeFile(fileDestination, xmlZipBlob, function (error, result) {
        if (error) {
            throw error;
        }

        context.log('saved blob to loal file called: ', tempFileName);
        context.done();
    });
};