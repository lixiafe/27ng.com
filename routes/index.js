var express = require('express');
var router = express.Router();
var models = require('../models');
var viewMap = require('./config').viewMap;

for(let i = 0; i < viewMap.length; i++){
	router.get(viewMap[i]["url"], function(req, res, next) {
		if(viewMap[i]["url"] == '/'){
	        models.Category.find({}, function(error, categories){
		        res.render('index', {title: viewMap[i]["title"],categories: categories, reqUrl: viewMap[i]["url"]});
	        });
		}else{
			models.Category.find({}, function(error, categories){
				models.Entry.find({}, function(error, entries){
					res.render('entry', {title: viewMap[i]["title"],categories: categories, entries: entries, reqUrl: viewMap[i]["url"]});
				});
			});
		}
	});
}


/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log(req.url);
//   models.Category.find({}, function(error, categories){
//     res.render('index', {title: '爱去宁国',categories: categories});
//   });
// });

// router.get('/mingzhan', function(req, res, next) {
//   models.Category.find({}, function(error, categories){
//     res.render('index', {title: '宁国名站 - 爱去宁国',categories: categories});
//   });
// });
//
// router.get('/gouwu', function(req, res, next) {
//   console.log(req.url);
//   res.render('index', { title: '购物指南 - 爱去宁国' });
// });
//
// router.get('/yule', function(req, res, next) {
//   res.render('index', { title: '娱乐休闲 - 爱去宁国' });
// });
//
// router.get('/meishi', function(req, res, next) {
//   res.render('index', { title: '餐饮美食 - 爱去宁国' });
// });
//
// router.get('/jiankang', function(req, res, next) {
//   res.render('index', { title: '健康美容 - 爱去宁国' });
// });
//
// router.get('/lvyou', function(req, res, next) {
//   res.render('index', { title: '旅游出行 - 爱去宁国' });
// });
//
// router.get('/shenghuo', function(req, res, next) {
//   res.render('index', { title: '生活服务 - 爱去宁国' });
// });
//
// router.get('/rencai', function(req, res, next) {
//   res.render('index', { title: '人才教育 - 爱去宁国' });
// });
//
// router.get('/fangchan', function(req, res, next) {
//   res.render('index', { title: '房产 - 爱去宁国' });
// });
//
// router.get('/qiye', function(req, res, next) {
//   res.render('index', { title: '企业之窗 - 爱去宁国' });
// });
//
// router.get('/zhengfu', function(req, res, next) {
//   res.render('index', { title: '政府之窗 - 爱去宁国' });
// });

module.exports = router;
