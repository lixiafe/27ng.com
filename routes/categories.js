var express = require('express');
var models = require('../models');
var auth = require('../middleware/auth');
var router = express.Router();

// 分类首页
router.get('/', auth.checkLogin, function(req, res, next){

    models.Category.update({}, {$set: { children: [] }}, { multi: true }, function(error, result){
        console.log('清空所有二级分类: ', result);
    });

    models.Category.find({}, function(error, categories){
        if(error){
            console.log(error);
        }else{
            models.SecCategory.find({}, function(err, seccategories){
               for(var i = 0; i < categories.length; i++){
                   for(var j = 0; j < seccategories.length; j++){
                        if(seccategories[j].parent.toString() == categories[i]._id.toString()){
                            models.Category.update({_id: categories[i]._id}, {$push: {children: seccategories[j]}}, function(err, result){
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log(result);
                                }
                            });
                        }
                   }
               }
            });
            res.send('执行成功');
        }
    });
});

// 二级分类列表
router.get('/list', auth.checkLogin, function(req, res, next){
   models.SecCategory.find({}, function(error, categories){
       res.render('category/list', {
           categories: categories,
           title: '二级分类列表',
           url: req.url // header中全局的, 需要移除
       });
   });
});

// 增加二级分类
router.get('/add', auth.checkLogin, function(req, res, next) {
    models.Category.find({}, function(error, categories){
        res.render('category/add',{
            categories: categories,
            title: '增加二级分类',
            url: req.url // header中全局的, 需要移除
        });
    });
});

// 增加二级分类
router.post('/add', auth.checkLogin, function(req, res, next) {
    var category = req.body;
    var _id = req.body.parent;
    models.Category.findById(_id, function(error, parent){
        category.parent = parent._id;
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

router.get('/run', auth.checkLogin, function(req, res, next){

});

module.exports = router;