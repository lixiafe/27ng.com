var express = require('express');
var markdown = require('markdown').markdown;
var models = require('../models');
var auth = require('../middleware/auth');
var multer = require('multer');
//指定存储的目录和文件名
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
var upload = multer({storage: storage});

var router = express.Router();
router.get('/list', auth.checkLogin, function(req, res, next) {
    //第一个参数是查询条件
    // 先查找, 把user字符串 - > 对象  mongoose帮我们做
    models.Article.find({}).populate('user').exec(function(error, articles){
        articles.forEach(function(article){
            article.content = markdown.toHTML(article.content);
        });
        res.render('article/list', { title: '文章列表 - 爱去宁国', articles: articles });
    });
});

router.get('/post', auth.checkLogin, function(req, res, next) {
    res.render('article/add', { title: '发表文章' });
});

router.post('/add', auth.checkLogin, upload.single('poster'), function(req, res, next) {
    //console.log(req.file);
    var article = req.body;
    //把当前登录的用户的ID赋给user
    article.user = req.session.user._id;
    if(req.file){
        article.poster = '/uploads/'+req.file.filename;
    }
    models.Article.create(article, function(error, doc){
        console.log(doc);
        if(error){
            req.flash('error', '文章发表失败');
        }else{
            req.flash('success', '文章发表成功');
        }
        res.redirect('/');
    });
});

module.exports = router;
