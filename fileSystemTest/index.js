var fs = require('fs');

var environmentVariables = [
    "WEBSITE_SITE_NAME",
    "WEBSITE_SKU",
    "WEBSITE_COMPUTE_MODE",
    "WEBSITE_HOSTNAME",
    "WEBSITE_INSTANCE_ID",
    "WEBSITE_NODE_DEFAULT_VERSION",
    "WEBSOCKET_CONCURRENT_REQUEST_LIMIT",
    "%APPDATA%",
    "%TMP%"
]

module.exports = function (context, req, res) {
    context.log('function triggered');
    context.log(req);

    context.log('Environment Variables');
    environmentVariables
        .map(getEnvironmentVarible)
        .forEach(context.log);

    context.log('process.cwd()', process.cwd());
    context.log('__dirname', __dirname);

    fs.writeFile('D:/local/Temp/message.txt', 'Hello Node.js', (err) => {
        if (err) throw err;
        context.log("It's saved!");
        context.done();
    });
}

function getEnvironmentVarible(name) {
    return name + ": " + process.env[name];
}