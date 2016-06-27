var express = require('express');
var router = express.Router();
var models = require('../models');

var viewMap = [
	{'url': '/'},
	{'url': '/mingzhan'},
	{'url': '/gouwu'},
	{'url': '/yule'},
	{'url': '/meishi'},
	{'url': '/jiankang'},
	{'url': '/lvyou'},
	{'url': '/shenghuo'},
	{'url': '/rencai'},
	{'url': '/qiye'},
	{'url': '/fangchan'},
	{'url': '/zhengfu'},
	{'url': '/contact'}
];

/* GET home page. */
// router.get('/', function(req, res, next) {
// 	models.Category.find({}, null, {sort:{sort:1}}, function(error, categories){
// 		res.render('index', {title: '爱去宁国',categories: categories, requrl: req.url});
// 	});
// });

for(let i = 0; i < viewMap.length; i++){
	router.get(viewMap[i]["url"], function(req, res, next) {
		if(req.url === '/' || req.url === '/contact'){
			models.Category.find({}, null, {sort:{sort:1}}, function(error, categories){
				res.render('index', {title: categories[i].name, categories: categories, requrl: req.url});
			});
		}else{
			models.Category.find({}, null, {sort:{sort:1}}, function(error, categories){
				models.Entry.find({}, function(error, entries){
					res.render('entry', {title: categories[i].name, categories: categories, entries: entries, requrl: req.url});
				});
			});
		}
	});
};

module.exports = router;
