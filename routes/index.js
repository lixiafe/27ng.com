var express = require('express');
var router = express.Router();
var models = require('../models');

var viewMap = [
  {'url': '/', 'title': '首页 - 爱去宁国'},
  {'url': '/mingzhan', 'title': '宁国名站 - 爱去宁国'},
  {'url': '/gouwu', 'title': '购物指南 - 爱去宁国'},
  {'url': '/yule', 'title': '娱乐休闲 - 爱去宁国'},
  {'url': '/meishi', 'title': '餐饮美食 - 爱去宁国'},
  {'url': '/jiankang', 'title': '健康美容 - 爱去宁国'},
  {'url': '/lvyou', 'title': '旅游出行 - 爱去宁国'},
  {'url': '/shenghuo', 'title': '生活服务 - 爱去宁国'},
  {'url': '/rencai', 'title': '人才教育 - 爱去宁国'},
  {'url': '/qiye', 'title': '企业 - 爱去宁国'},
  {'url': '/fangchan', 'title': '房产 - 爱去宁国'},
  {'url': '/zhengfu', 'title': '政府 - 爱去宁国'},
  {'url': '/contact', 'title': '联系我们 - 爱去宁国'}
];

/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log(req.url);
//   models.Category.find({}, function(error, categories){
//     res.render('index', {title: '爱去宁国',categories: categories});
//   });
// });

for(let i = 0; i < viewMap.length; i++){
	console.log(viewMap[i]["url"]);
	router.get(viewMap[i]["url"], function(req, res, next) {
	  if(viewMap[i]["url"] == '/'){
	      models.Category.find({}, function(error, categories){
		      res.render('index', {title: viewMap[i]["title"],categories: categories, reqUrl: viewMap[i]["url"]});
	      });
	  }else{
		  models.Category.find({}, function(error, categories){
			  res.render('index', {title: viewMap[i]["title"],categories: categories, reqUrl: viewMap[i]["url"]});
		  });
	  }
	});
}

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
