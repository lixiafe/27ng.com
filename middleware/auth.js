//必须登录之后才能访问
exports.checkLogin = function(req, res, next){
    if(req.session.user){
        next();
    }else{
        req.flash('error', '您还未登录');
        res.redirect('/users/login');
    }
}
//必须登录之前才能访问
exports.checkNotLogin = function(req, res, next){
    if(req.session.user){
        req.flash('error', '您已登录');
        res.redirect('/');
    }else{
        next();
    }
}