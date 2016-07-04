var mongoose = require('mongoose'); // 引用mongoose
var config = require('../config');
var db = mongoose.connect(config.dbUrl); // 使用mongoose连接数据库

//执行下面代码检查默认数据库test，是否可以正常连接成功?
db.connection.on('error', function(error){
    console.log('数据库连接失败: ' + error);
});
db.connection.on('open', function(){
    console.log('数据库连接成功');
});

// 定义用户Schema
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String
});
// 创建odel
var UserModel = db.model('users', UserSchema);//users 如果不写s, mongodb会自动加上, 合的名称 person -> people
// users：数据库中的集合(collections)名称,当我们对其添加数据时如果users已经存在，则会保存到其目录下，如果未存在，则会创建users集合，然后在保存数据。

var ObjectId = mongoose.Schema.Types.ObjectId;

// 定义文章Schema
var ArticleSchema = new mongoose.Schema({
    user: {type: ObjectId, ref: 'users'},//是一个对象ID类型,引用用户模型
    title: String,//文章标题
    content: String,
    poster: String, //增加了图片字段
    comments: [{
        user:{type:ObjectId, ref:'users'},   //用户名
        content:String,
        createAt:{type: Date, default:Date.now()}
    }],
    createAt: {type: Date, default: Date.now()},
    pv: {type: Number, default: 0}
});
var ArticleModel = db.model('Articles', ArticleSchema);

// 定义一级分类Schema
var CategorySchema = new mongoose.Schema({
    name: String,
    meta: String,
    url: String,
    children: [{
        catetory: {type:ObjectId, ref:'seccategories'}, //二级分类
        name: String,
        url: String
    }],
    sort: {type: Number, default: 0}
});
var CategoryModel = db.model('categories', CategorySchema);

// 定义二级分类Schema
var SecCategorySchema = new mongoose.Schema({
    name: String,
    meta: String,
    url: String,
    parent: { type: ObjectId, ref: 'categories'}
});
var SecCategoryModel = db.model('seccategories', SecCategorySchema);

// 定义单条信息Schema
var EntrySchema = new mongoose.Schema({
    category: {type:ObjectId, ref:'seccategories'},
    name: String,
    meta: String,
    desc: String,
    url: String,
    logo: String,
    photos: [],
    pv: {type: Number, default: 0},
    comments: [{
        user:{type:ObjectId, ref:'users'},   //用户名
        content:String,
        createAt:{type: Date, default:Date.now()}
    }]
});
var EntryModel = db.model('entries', EntrySchema);

//User 是模型
exports.User = UserModel;
exports.Article = ArticleModel;
exports.Category = CategoryModel;
exports.SecCategory = SecCategoryModel;
exports.Entry = EntryModel;
