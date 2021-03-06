# smile

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

    app.set('port', process.env.PORT || 5000);  // port number
    app.set('views', __dirname +'/views');      // path
    app.set('view engine', 'pug');              // file type

    app.use(express.static(__dirname));
    app.use(require('body-parser')());          // req.body.name
    app.use(require('cookie-parser')());        // res.cookie

    app.get('/index', function(req, res) {
        res.write('<h1>Node.js</h1>');
        res.end('<p>Hello Node</p>');
    });

    app.listen(app.get('port'), function() {    // listen
        console.log('url：localhost:'+ app.get('port'));
    });
```

### body-parser

- 安装：`$ npm install body-parser --save-dev`
- 使用：
``` javaScript
    // app.js
    app.use(require('body-parser')());          // req.body.name

    app.post('/name', function(req, res) {
        var name = req.body.name,
        return res.send({'success':1, 'name':name});
    });
```

### cookie-parser

- 安装：`$ npm install cookie-parser --save-dev`
- 使用：
``` javaScript
    // app.js
    app.use(require('cookie-parser')());        // cookie

    app.get('/index', function(req, res) {
        res.cookie('token', '666', {maxAge: 30*60*1000});
        // res.clearCookie('token');
        res.end('<p>Hello Node</p>');
    });
```

### express-session

- 安装：`$ npm install express-session --save-dev`
- 使用：
``` javaScript
    // app.js
    app.use(require('express-session')({        // req.session
        'secret': '12cat',
        'cookie': {'maxAge': 30*60*1000}        // 过期时间（毫秒）
    }));

    app.get('/index', function(req, res) {
        req.session.token = '666';
        res.end('<p>Hello Node</p>');
    });
```

### pug 模版

- 安装：`$ npm install pug --save-dev`
- 使用：
``` javaScript
    // app.js
    app.set('views', __dirname +'/view');       // path
    app.set('view engine', 'pug');              // file type

    app.get('/index', function(req, res) {
        var name = req.query.name;
        res.render('home/index', {'name':name});
    });
```
``` pug
    doctype html

    html(lang="en")
        head
            title title
        body
            h3 #{name}
```

### log日志

- 安装：`$ npm install log4js --save-dev`
- 使用：
``` javaScript
    // configfile.json
    {
      "appenders": [
        {
            "type": "console"
        },
        {
            "type": "file",
            "filename": "logs/info.log",
            "category": "cheese",
            "maxLogSize": 1024
        },
        {
            "type": "logLevelFilter",
            "level": "ERROR",
            "appender": {
                "type": "file",
                "filename": "logs/error.log",
                "maxLogSize": 1048576,
                "backups": 100
            }
        }
      ]
    }
```
``` javaScript
    // app.js
    var log4js = require('log4js');
    log4js.configure('configfile.json');

    // var logger = log4js.getLogger();
    var logger = log4js.getLogger('cheese');    // 分类
    // TRACE, DEBUG, INFO, WARN, ERROR, FATAL
    logger.setLevel('ERROR');       // 对日志级别过滤

    logger.trace('Entering cheese testing');
    logger.debug('Got cheese.');
    logger.info('Cheese is Gouda.');
    logger.warn('Cheese is quite smelly.');
    logger.error('Cheese is too ripe!');
    logger.fatal('Cheese was breeding ground for listeria.');
```

### 异步流程

- 安装：`$ npm install async --save-dev`

> 1. series(tasks, [callback]) （多个函数依次执行，之间没有数据交换）

``` javaScript
    var async = require('async');

    async.series([
        function(cb) {
            // ...
        },
        function(cb) {
            // ...
        },
        function(cb) {
            // ...
        }
    ], function(err, values) {
       // do somethig with the err or values v1/v2/v3
    });
```

> 2. parallel(tasks, [callback]) （多个函数并行执行）

``` javaScript
    var async = require('async');

    async.parallel([ 
        function(cb) { t.fire('a400', cb, 400) }, 
        function(cb) { t.fire('a200', cb, 200) }, 
        function(cb) { t.fire('a300', cb, 300) } 
    ], function (err, results) { 
        log('1.1 err: ', err);          // -> undefined 
        log('1.1 results: ', results);  // ->[ 'a400', 'a200', 'a300' ] 
    });
```

> 3. 其它

``` javaScript
    var async = require(‘async’)

    // 3. waterfall(tasks, [callback]) （多个函数依次执行，且前一个的输出为后一个的输入）
    // 4. auto(tasks, [callback]) （多个函数有依赖关系，有的并行执行，有的依次执行）
    // 5. whilst(test, fn, callback)（用可于异步调用的while）
    // 6. until(test, fn, callback) （与while相似，但判断条件相反）
    // 7. queue （可设定worker数量的队列）
    // 8. iterator(tasks) （将几个函数包装为iterator）
    // 9. apply(function, arguments..) （给函数预绑定参数）
    // 10. nextTick(callback) （在nodejs与浏览器两边行为一致）
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

> fs

``` javaScript
var fs = require('fs');

fs.readFile('/data/user.json', 'utf-8', function(err, data) {
    // JSON.parse(data)
});

fs.writeFile('/data/user.json', text, 'utf-8', function(err) {
    // ...
});
```

> 继承 inherits（只继承 prototype 部分）

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
```
> base
> Hello base
> { name: 'base', base: 1991, sayHello: [Function] }
> sub
> { name: 'sub' }
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
```
> listener1 byvoid 1991
> listener2 byvoid 1991
```

> EventEmitter常用的API。

- `EventEmitter.on(event, listener)`为指定事件注册一个监听器，接受一个字符串`event`和一个回调函数`listener`。

- `EventEmitter.emit(event, [arg1], [arg2], [...])`发射`event`事件，传递若干可选参数到事件监听器的参数表。

- `EventEmitter.once(event, listener)`为指定事件注册一个单次监听器，即监听器最多只会触发一次，触发后立刻解除该监听器。

- `EventEmitter.removeListener(event, listener)`移除指定事件的某个监听器，`listener`必须是该事件已经注册过的监听器。

- `EventEmitter.removeAllListeners([event])`移除所有事件的所有监听器，如果指定`event`，则移除指定事件的所有监听器。
