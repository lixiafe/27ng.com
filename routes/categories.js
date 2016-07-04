var express = require('express');
var models = require('../models');
var auth = require('../middleware/auth');

var router = express.Router();

router.get('/', auth.checkLogin, function(req, res, next){
    res.send('分类展示页面');
});

router.get('/list', auth.checkLogin, function(req, res, next){
   models.SecCategory.find({}, function(error, categories){
       res.render('category/list', {
           categories: categories,
           title: '二级分类列表',
           url: req.url // header中全局的, 需要移除
       })
   }) 
});

router.get('/add', auth.checkLogin, function(req, res, next) {
    models.Category.find({}, function(error, categories){
        res.render('category/add',{
            categories: categories,
            title: '增加二级分类',
            url: req.url // header中全局的, 需要移除
        });
    });
});


router.post('/add', auth.checkLogin, function(req, res, next) {
    var category = req.body;
    var _id = req.body.parent;
    models.Category.findById(_id, function(error, parent){
        category.parent = parent._id;
        console.log(category);
        models.SecCategory.create(category, function(error, category){
            if(error){
                console.log(error);
                req.flash('error', '增加分类失败');
            }else{
                req.flash('success', '增加分类成功');
            }
            res.redirect('/categories/list');
        });
    });

});

module.exports = router;