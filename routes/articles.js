var express = require('express');
var path = require('path');
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
        cb(null, file.originalname.split('.')[0] + Date.now() + '.' + file.originalname.split('.')[1]);
    }
});
var upload = multer({storage: storage});

var router = express.Router();
router.get('/list', auth.checkLogin, function(req, res, next) {
    //第一个参数是查询条件
    // 先查找, 把user字符串 - > 对象  mongoose帮我们做

    var q = req.query.q;
    var pageNum = parseInt(req.query.pageNum) || 1;
    var pageSize = 3;
    var queryObj = {};
    if(q){
        var reg = new RegExp(q, 'i');
        queryObj = {$or: [{title: reg}, {content: reg}]};
    }

    models.Article.find(queryObj).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(error, articles){

        articles.forEach(function(article){
            article.content = markdown.toHTML(article.content);
        });

        //取得这个条件有多少条符合的数据
        models.Article.count(queryObj, function(error, count){
            res.render('article/list', {
                title: '文章列表 - 爱去宁国',
                articles: articles,
                q: q,
                totalPage: Math.ceil(count/pageSize),
                pageNum: pageNum,
                pageSize: pageSize
            });
        });
    });
});

router.get('/post', auth.checkLogin, function(req, res, next) {
    res.render('article/add', { title: '发表文章', article: {} });
});

router.post('/add', auth.checkLogin, upload.single('poster'), function(req, res, next) {
    var article = req.body;
    var _id = article._id;
    if(_id){
        var updateObj = {
            title: article.title,
            content: article.content
        };
        if(req.file){
            updateObj.poster = path.join('/uploads', req.file.filename);
        }

        models.Article.update({_id: _id}, {$set:updateObj}, function(err, result){
            if(err){
                req.flash('error', '文章更新失败');
            }else{
                req.flash('success', '文章更新成功');
                res.redirect('/articles/list');
            }
        });
    }else{
        article.user = req.session.user._id;//把当前登录的用户的ID赋给user
        if(req.file){
            article.poster = path.join('/uploads', req.file.filename);
        }
        models.Article.create(article, function(error, doc){
            if(error){
                console.log(error);
                req.flash('error', '文章发表失败');
            }else{
                req.flash('success', '文章发表成功');
            }
            res.redirect('/articles/list');
        });
    }
});

router.get('/detail/:_id', function(req, res){
    var _id = req.params._id;
    models.Article.findById(_id).populate('user').populate('comments.user').exec(function(err, article){
        console.log(article);
        article.content = markdown.toHTML(article.content);
        res.render('article/detail', {
            title: article.title + ' - 爱去宁国',
            article: article
        });
    });
});

router.get('/delete/:_id', function(req, res){
    var _id = req.params._id;
    models.Article.remove({_id: _id}, function(err, result){
        req.flash('success', '文章删除成功');
        res.redirect('/articles/list');
    });
});

router.get('/edit/:_id', function(req, res){
    var _id = req.params._id;
    models.Article.findById(_id, function(err, article){
        //article.content = markdown.toHTML(article.content);
        res.render('article/add', {
            title: '修改文章 - 爱去宁国',
            article: article
        })
    });
});

router.post('/comment', auth.checkLogin, function(req, res){
    var user = req.session.user;
    console.log(user);
    models.Article.update({_id: req.body._id}, {$push:{comments:{user:user._id, content: req.body.content, createAt: Date.now()}}}, function(err, result){
        if(err){
            req.flash('error', err);
            return res.redirect('back');
        }
        console.log(result);
        req.flash('success', '评论成功');
        res.redirect('back');
    });
});


module.exports = router;
