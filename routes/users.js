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

router.post('/reg', function(req, res, next) {
    var user = req.body;
    models.User.create(req.body, function(err, doc){
        console.log(doc);
        res.redirect('/users/login');
    });
});

router.get('/login', function(req, res, next) {
    res.render('index', { title: '登录 - 爱去宁国' });
});

router.get('/logout', function(req, res, next) {
    res.render('index', { title: '退出 - 爱去宁国' });
});

module.exports = router;
