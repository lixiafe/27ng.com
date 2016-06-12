window.onload = function(){
    var oBtn = document.getElementById('user-login');
    var cBtn = document.getElementById('close-login-btn');
    var loginBox = document.getElementById('login-box');
    cBtn.addEventListener('click', function(){
        loginBox.style.display = 'none';
    });
    oBtn.addEventListener('click', function(){
        loginBox.style.display = 'block';
    });
}