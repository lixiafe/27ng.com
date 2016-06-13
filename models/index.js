var mongoose = require('mongoose');
var config = require('../config');
var db = mongoose.connect(config.dbUrl);

//执行下面代码检查默认数据库test，是否可以正常连接成功?
db.connection.on('error', function(error){
    console.log('数据库连接失败: ' + error);
});
db.connection.on('open', function(){
    console.log('数据库连接成功');
});

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

var UserModel = db.model('users', UserSchema);
//users 如果不写s, mongodb会自动加上, 合的名称 person -> people

// var userEntity = new UserModel({
//     username: "lixia",
//     password: 6,
//     email: "lixia@qq.com"
// });
//
// console.log(userEntity.username);
// console.log(userEntity.password);
// console.log(userEntity.email);
//
// userEntity.save(function(error,doc){
//     if(error){
//         console.log("error :" + error);
//     }else{
//         console.log(doc);
//     }
// });

//User 是模型
exports.User = UserModel;
