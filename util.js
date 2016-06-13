exports.md5 = function(){
    var crypto = require('crypto');
    return require('crypto').createHash('md5').update('1').digest('hex');//以16进制表示输出的值
}
