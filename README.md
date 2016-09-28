# 27ng.com

### 生成文件说明
* app.js : express的主配置文件
* package.json : 存储工程信息以及模块依赖， 当在dependencies中添加依赖的模块时，运行 ``` npm instsll ``` npm会检查当前目录下得package.json, 并自动安装所有指定的模块
* node_modules : 存放package.json中安装的模块，当在package.json添加依赖的模块并安装后，存放在这个文件夹下
* public : 存放 image 、css 、 js 等文件
* routes : 存放路由文件
* views : 存放视图文件或者说模板文件
* bin : 可执行文件, 可以从此启动服务器
