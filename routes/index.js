var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '爱去宁国' });
});

router.get('/mingzhan', function(req, res, next) {
  res.render('index', { title: '宁国名站 - 爱去宁国' });
});

router.get('/gouwu', function(req, res, next) {
  res.render('index', { title: '购物指南 - 爱去宁国' });
});

router.get('/yule', function(req, res, next) {
  res.render('index', { title: '娱乐休闲 - 爱去宁国' });
});

router.get('/meishi', function(req, res, next) {
  res.render('index', { title: '餐饮美食 - 爱去宁国' });
});

router.get('/jiankang', function(req, res, next) {
  res.render('index', { title: '健康美容 - 爱去宁国' });
});

router.get('/lvyou', function(req, res, next) {
  res.render('index', { title: '旅游出行 - 爱去宁国' });
});

router.get('/shenghuo', function(req, res, next) {
  res.render('index', { title: '生活服务 - 爱去宁国' });
});

router.get('/rencai', function(req, res, next) {
  res.render('index', { title: '人才教育 - 爱去宁国' });
});

router.get('/fangchan', function(req, res, next) {
  res.render('index', { title: '房产 - 爱去宁国' });
});

router.get('/qiye', function(req, res, next) {
  res.render('index', { title: '企业之窗 - 爱去宁国' });
});

router.get('/zhengfu', function(req, res, next) {
  res.render('index', { title: '政府之窗 - 爱去宁国' });
});

module.exports = router;
