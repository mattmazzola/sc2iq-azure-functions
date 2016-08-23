module.exports = function (context, myBlob) {
    context.log('Node.js blob trigger function processed blob:', myBlob);
    console.log('Edited');
    console.log(myBlob);
    context.done();
};