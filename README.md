# node-show

# 常用方法

### 调试工具（监测代码更新，自动重启服务）

- 安装：`$ npm install -g supervisor`
- 启动：`$ supervisor app.js`

### express

- 安装：`$ npm install express --save-dev`
- 使用：
``` javaScript
    // app.js
    var express = require('express');
    var app = express();

    app.set('port', process.env.PORT || 5000);  // Port number
    app.set('views', __dirname +'/view');       // path

    app.use(express.static(__dirname));

    app.get('/', function(req, res) {
        res.write('<h1>Node.js</h1>');
        res.end('<p>Hello Node</p>');
    });

    app.listen(app.get('port'), function() {    // listen
        console.log(' url：localhost:'+ app.get('port'));
        console.log('stop：Ctrl + c');
    });
```

### body-parser

- 安装：`$ npm install body-parser --save-dev`
- 使用：
``` javaScript
    // app.js
    app.use(require('body-parser')());

    app.post('/name', function(req, res) {
        var name = req.body.name,
        return res.send({'success':1, 'name':name});
    });
```

### cookie-parser

- 安装：`$ npm install cookie-parser --save-dev`
- - 使用：
``` javaScript
    app.use(require('cookie-parser')());

    app.get('/index', function(req, res) {
        res.cookie('token', '666', {maxAge: 30*60*1000});
        res.end('<p>Hello Node</p>');
    });
```

### pug 模版

- 安装：`$ npm install pug --save-dev`
- - 使用：
``` javaScript

```

### 模块封装 exports

> 1 封装方法

``` javaScript
    // 创建模块 module1.js
    var name;
    exports.setName = function(thyName) {
        name = thyName;
    };
    exports.sayHello = function() {
        console.log('Hello ' + name);
    };
    // 引用模块
    var myModule = require('./module1');
    myModule.setName('BYVoid');
    myModule.sayHello();
```

> 封装对象（一）

``` javaScript
    // 创建模块 module2.js
    function Hello() {
        var name;
        this.setName = function (thyName) {
            name = thyName;
        };
        this.sayHello = function () {
            console.log('Hello ' + name);
        };
    };
    exports.Hello = Hello;
    // 引用模块
    var Hello = require('./module2').Hello;
    hello = new Hello();
    hello.setName('BYVoid');
    hello.sayHello();
```

> 封装对象（二）

``` javaScript
    // 创建模块 module3.js
    function Hello() {
        var name;
        this.setName = function(thyName) {
            name = thyName;
        };
        this.sayHello = function() {
            console.log('Hello ' + name);
        };
    };
    module.exports = Hello;
    // 引用模块
    var Hello = require('./module3');
    hello = new Hello();
    hello.setName('BYVoid');
    hello.sayHello();
```

### 请求示例

> get 请求

``` javaScript
app.get('/request1', function(req, res) {
        res.write('<h1>Node.js</h1>');
        res.end('<p>Hello Node</p>');
    });
app.get('/request2', function(req, res) {
        res.type('text/plain');
        res.end('The time is '+ new Date().toString());
    });
app.get('/request3/:name/:age', function(req, res) {
        var name = req.params.name;
        var age = req.params.age;
        res.type('text/plain');
        res.send('The name is '+ name +', The age is '+ age);
    });
app.get('/request4', function(req, res, next) {
        console.log('do something');
        next();
    });
app.get('/request4', function(req, res) {
        var name = req.query.name;          // 获取参数
        // res.render('page/index');
        res.render('page/index', {'name':name});
    });
app.get('/request5', function(req, res) {
        res.redirect('/?url='+ req.url);    // 请求转发
    });
```

> post 请求

``` javaScript
app.use(require('body-parser')());  // 参数获取，如：req.body.name
app.post('/request1', function(req, res) {
        var name = req.body.name;
        res.send({'success':1, 'name':name});
    });
app.use(require('cookie-parser')());        // 控制 cookie
app.post('/request2', function(req, res) {
        res.cookie('token', '666', {maxAge: 30*60*1000});
        // res.clearCookie('token');
        res.redirect('/?url='+ req.url);    // 请求转发
    });
```

### util 工具包

1. 继承 inherits

> 只继承 prototype 部分

``` javaScript
var util = require('util');

function Base() {
    this.name = 'base';
    this.base = 1991;

    this.sayHello = function() {
        console.log('Hello ' + this.name);
    };
}

Base.prototype.showName = function() {
    console.log(this.name);
};

function Sub() {
    this.name = 'sub';
}

util.inherits(Sub, Base);

var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

var objSub = new Sub();
objSub.showName();
console.log(objSub);
```
**运行结果：**
``` javaScript
base
Hello base
{ name: 'base', base: 1991, sayHello: [Function] }
sub
{ name: 'sub' }
```

### 事件发射

``` javaScript
var events = require('events');

var emitter = new events.EventEmitter();

// 注册两个时间监听
emitter.on('someEvent', function(arg1, arg2) {
  console.log('listener1', arg1, arg2);
});
emitter.on('someEvent', function(arg1, arg2) {
  console.log('listener2', arg1, arg2);
});

// 事件发射
emitter.emit('someEvent', 'byvoid', 1991);
```
**运行结果：**
``` javaScript
listener1 byvoid 1991
listener2 byvoid 1991
```

> EventEmitter常用的API。

- `EventEmitter.on(event, listener)`为指定事件注册一个监听器，接受一个字符串`event`和一个回调函数`listener`。

- `EventEmitter.emit(event, [arg1], [arg2], [...])`发射`event`事件，传递若干可选参数到事件监听器的参数表。

- `EventEmitter.once(event, listener)`为指定事件注册一个单次监听器，即监听器最多只会触发一次，触发后立刻解除该监听器。

- `EventEmitter.removeListener(event, listener)`移除指定事件的某个监听器，`listener`必须是该事件已经注册过的监听器。

- `EventEmitter.removeAllListeners([event])`移除所有事件的所有监听器，如果指定`event`，则移除指定事件的所有监听器。
