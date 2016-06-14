var express = require('express');
var models = require('../models');
var auth = require('../middleware/auth');
var router = express.Router();

router.get('/list', auth.checkLogin, function(req, res, next) {
    //第一个参数是查询条件
    // 先查找, 把user字符串 - > 对象  mongoose帮我们做
    models.Article.find({}).populate('user').exec(function(error, articles){
        res.render('article/list', { title: '文章列表 - 爱去宁国', articles: articles });
    });
});

router.get('/post', auth.checkLogin, function(req, res, next) {
    res.render('article/add', { title: '发表文章' });
});

router.post('/add', auth.checkLogin, function(req, res, next) {
    var article = req.body;
    //把当前登录的用户的ID赋给user
    article.user = req.session.user._id;
    models.Article.create(article, function(error, doc){
        if(error){
            req.flash('error', '文章发表失败');
        }else{
            req.flash('success', '文章发表成功');
        }
        res.redirect('/');
    });
});

module.exports = router;
