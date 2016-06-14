var express = require('express');
var router = express.Router();
var models = require('../models');
var util = require('../util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('个人中心页');
});

router.get('/reg', function(req, res, next) {
  res.render('user/reg', { title: '注册 - 爱去宁国' });
});

router.get('/login', function(req, res, next) {
    res.render('user/login', { title: '登录 - 爱去宁国' });
});

router.post('/reg', function(req, res, next) {
    var user = req.body;
    if(user.password != user.repassword){
        res.redirect('back');
    }else{
        req.body.password = util.md5(req.body.password);
        models.User.create(req.body, function(error, doc){
            console.log(doc);
            if(error){
                req.flash('error', '注册失败');
            }else{
                req.flash('success', '注册成功');
                res.redirect('/users/login');
            }
        });
    }
});

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = util.md5(req.body.password);
    models.User.findOne({username: username, password: password}, function(error, doc){
        if(error){
            req.flash('error', '登录失败');
            res.redirect('back'); //如果登录出错了,重新登录，这点体验要改
        }else{
            if(doc){
                //登录成功后把查询到的user用户赋给session的user属性
                req.session.user = doc;
                req.flash('success', '登录成功');
                res.redirect('/');
            }else{
                req.flash('error', '登录失败');
                res.redirect('back');
            }
        }
    });
});

router.get('/logout', function(req, res, next) {
    req.session.user = null;
    req.flash('success', '退出成功');
    res.redirect('/');
});

module.exports = router;
