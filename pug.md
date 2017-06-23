# pug

> layout

``` css
    /* include style.css */
    h1 {color: #3399ff;}
```

``` pug
    //- include top
    h1 WELL COME TO MY WORLD !
```

``` html
    <!-- include footer.html -->
    <div class="footer">footer</div>
```

``` pug
     //- layout
    doctype html

    html(lang="en")
        head
            title pug demo
            block style
                link(rel="stylesheet" href="style.css")
            style
                include style.css
        body
            include top

            block content
                p default content

            include footer.html
```

``` pug
     //- demo
    extends layout

    block style
        link(rel="stylesheet" href="static/css/common.css")

    block content
        p this is content

    prepend content     //- 插入 content 之前
        span prepend
    append content      //- 插入 content 之后
        span append
```

> 基本语法

``` pug
    p: span 不用换行
    p
        span 换行
    p.
        多行
        文本
    p
        | 多行
        | 文本
```

> 注释

``` pug
    // 单行注释，在html中显示为\<!-- --\>
    //- 单行注释，在html中不显示
    //
        多行注释
        在html中显示为\<!-- --\>
    //-
        多行注释
        在html中不显示
```

> 变量

``` pug
    -var xss1 = '&lt;script&gt;alert(123)&lt;script&gt;';
    -var xss2 = '<script>alert(123)</script>';
    
    p= xss1     //- 防止XSS攻击，&lt;script&gt;alert(123)&lt;script&gt;
    p= xss2     //- 防止XSS攻击，<script>alert(123)</script>
    p #{xss1}   //- 防止XSS攻击，&lt;script&gt;alert(123)&lt;script&gt;
    p #{xss2}   //- 防止XSS攻击，<script>alert(123)</script>
    p!= xss1    //- XSS攻击风险，<script>alert(123)</script>
    p!= xss2    //- XSS攻击风险，运行脚本
    p !{xss1}   //- XSS攻击风险，<script>alert(123)</script>
    p !{xss2}   //- XSS攻击风险，运行脚本
    
    -var str = 'http://www.baidu.com';
    -var obj = {'type': 'text', 'name': '12cat'};

    a(href=str+'/maps') 百度地图
    input(tupe='#{obj.type}', value='#{obj.name}')
```

> 逻辑

``` pug
    //- if/else
    -var t1 = 1;
    -if (t1 === 1) {
        span t1=1
    -} else {
        span t1!=1
    -}

    //- unless/else
    -var t2 = 2;
    unless t2===2
        span t2!=2
    else
        span t2=2

    //- case...when
    -var t3 = 3;
    case t3
        when 1
            span t3=1
        when 2
            span t3=2
        default
            span t3=#{t3}

    //- for loops
    -var t4 = ['A', 'B', 'C'];
    -for (var i=0; i<t4.length; i++) {
        span= t4[i]
    -}

    //- each loops
    -var t5 = ['A', 'B', 'C'];
    each item in t5
        span #{item}

    each t, i in t5
        span #{i}=#{t}

    -var t5 = {'001':'A', '002':'B', '003':'C'};
    each t, i in t5
        span #{i}=#{t}

    //- while loops
    -var t6 = ['A', 'B', 'C'];
    -var i = 0;
    while i < t6.length
        span #{t6[i++]}
```

> mixin

``` pug
    //- 有参数
    mixin fun1(username, password)
        span username: #{username}, password: #{password}
    +fun1('12cat', '3.14')
    
    //- 无参数
    mixin fun2
        span fun2
    +fun2

    //- block
    mixin fun3(str)
        label #{str}：
        block
    +fun3('12cat')
        span 代替body

    //- arguments
    mixin fun4()
        -var args = [].slice.call(arguments);
        for i in args
            span= i
    +fun4('A', 'B', 'C')
```