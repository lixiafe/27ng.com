exports.md5 = function(input){
    var crypto = require('crypto');
    return require('crypto').createHash('md5').update(input).digest('hex');//以16进制表示输出的值
}
