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
    email: String,
    avatar: String
});
var UserModel = db.model('users', UserSchema);
//users 如果不写s, mongodb会自动加上, 合的名称 person -> people

var ObjectId = mongoose.Schema.Types.ObjectId;
var ArticleSchema = new mongoose.Schema({
    //是一个对象ID类型,引用用户模型
    user: {type: ObjectId, ref: 'users'},
    content: String,
    poster: String, //增加了图片字段
    createAt: {type: Date, default: Date.now()}
});
var ArticleModel = db.model('Articles', ArticleSchema);

//User 是模型
exports.User = UserModel;
exports.Article = ArticleModel;
