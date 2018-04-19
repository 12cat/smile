# pug

> 注释

```
    //- 不会显示在html中的注释
    // 以<!-- 注释 -->形式出现在html中的注释
```

> id

```
    div#name text
    div(id="name") text

    //- 解析后
    <div id="name">text</div>
```

> class

```
    div.className text
    div(class="className") text

    //- 解析后
    <div class="className">text</div>
```

> 属性

```
    input(type="text" value="123" style={color:"red", background:"#eee"})
    input(type="text",value="123",style={color:"red", background:"#eee"})

    //- 解析后
    <input type="text" value="123" style="color:red, background:#eee"/>
```

> 文本

```
    p text
    p: span span text
    p.
        text1
        text2
    p
        | text1
        | text2
        span span text
        | text3

    //- 解析后
    <p>text</p>
    <p><span>span text</span><p>
    <p>text1 text2</p>
    <p>text1 text2<span>span text</span>text3</p>
```

> if - else if - else

```
    - var num = 1
    if num==1
        p num is one
    else if num==2
        p num is two
    else
        p num is other
```

> unless else

```
    - var b = true
    unless b
        p b is false
    else
        p b is true
```

> case when

```
    - var num = 2
    case num
        when 1
            break
        when 2
            p num is two
        default
            p num is other
```

> for in

```
    - var arr1 = ["a", "b", "c"]
    - var arr2 = {name:"cat", age:18, class:"china"}
    for val in arr1
        p= val
    for val, key in arr2
        p= key +"= "+ val
```

> each in

```
    - var arr1 = ["a", "b", "c"]
    - var arr2 = {name:"cat", age:18, class:"china"}
    each val in arr1
        p= val
    each val, key in arr2
        p= key +"= "+ val
```

> while

```
    - var num = 0
    while num<10
        p= num++
```

> 变量

```
    - var name = "cat"
    - var age = 18
    //- 转义防止XSS攻击
    p= name
    p #{name}
    p(name=name)
    //- 不会防止XSS攻击
    p!= name
    p !{name}
```

> mixin

```
    mixin getname(name)
        h3 #{name}
        if block
            block
        else
            h4 123
    +getname('dull')

    +getname('dulonglong')
        h4 456

```

> extends block, include, append, prepend

```
    //- style.css
    h1 {color: #3399ff;}

    //- top.pug
    h1 WELL COME TO MY WORLD !

    //- footer.html
    <div class="footer">footer</div>
    
    //- layout.pug
    doctype html
    html(lang="en")
        head
            title demo
            meta(charset="utf-8")
            block style
                link(rel="stylesheet" href="style.css")
            style
                include style.css
    body
        include top
        block content
            p content模块默认内容
        include footer.html

    //- index.pug
    extends layout
    block style
        link(rel="stylesheet" href="static/css/common.css")
    block content
        h3 文本文本
    append content
        h5 放到content模块后面
    prepend content
        h5 放到content模块前面
```