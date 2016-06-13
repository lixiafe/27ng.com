var express = require('express');
var router = express.Router();
var models = require('../models');

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
        models.User.create(req.body, function(err, doc){
            console.log(doc);
            res.redirect('/users/login');
        });
    }
});

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    models.User.findOne({username: username, password: password}, function(error, doc){
        if(error){
            res.redirect('back'); //如果登录出错了,重新登录，这点体验要改
        }else{
            if(doc){
                res.redirect('/');
            }else{
                res.redirect('back');
            }
        }
    });
});

router.get('/logout', function(req, res, next) {
    res.render('index', { title: '退出 - 爱去宁国' });
});

module.exports = router;
