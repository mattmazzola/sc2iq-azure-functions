var fs = require('fs');
var path = require('path');

var environmentVariables = [
    "WEBSITE_SITE_NAME",
    "WEBSITE_SKU",
    "WEBSITE_COMPUTE_MODE",
    "WEBSITE_HOSTNAME",
    "WEBSITE_INSTANCE_ID",
    "WEBSITE_NODE_DEFAULT_VERSION",
    "WEBSOCKET_CONCURRENT_REQUEST_LIMIT",
    "APPDATA",
    "TMP",
    "HOME",
    "SYSTEMDRIVE",
    "WEBJOBS_PATH",
    "WEBJOBS_NAME",
    "WEBJOBS_TYPE",
    "WEBJOBS_DATA_PATH",
    "WEBJOBS_RUN_ID",
    "WEBJOBS_SHUTDOWN_FILE",
    "WEBSITE_NODE_DEFAULT_VERSION",
    "WEBSITE_NPM_DEFAULT_VERSION"
]

module.exports = function (context, req, res) {
    context.log('function triggered');
    context.log(req);

    context.log('Environment Variables');
    context.log(process.env);

    context.log('process.cwd()', process.cwd());
    context.log('__dirname', __dirname);

    var tempDir = process.env["TMP"];
    var homeDir = process.env["HOME"];
    var filePath = path.join(tempDir, 'message.txt');
    var homeFilePath = path.join(homeDir, 'message.txt');
    var fileContents = 'Hellow Node.js_' + req.body.message;

    context.log("destination: ", homeFilePath);
    context.log("writing: ", fileContents);

    fs.writeFile(homeFilePath, fileContents, (err) => {
        if (err) {
            throw err;
        }

        context.log("File is saved!");
        context.res = {
            status: 200,
            body: {
                message: 'You successfully saved the file to: ' + homeFilePath
            }
        };
        context.done();
    });
}

function getEnvironmentVarible(name) {
    return name + ": " + process.env[name];
}