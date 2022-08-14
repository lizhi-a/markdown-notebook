const express = require('express')
var path = require('path')
var router = require('./router')
var session = require('express-session')

var bodyParser = require('body-parser')
var app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//配置解析表单POST请求体数据,要在app.use(router)之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    // 配置加密字符串，他会在原有加密基础上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'itcast',
    resave: false,
    // 默认为true:即无论你是否使用session,我都默认直接给你分配一把钥匙
    // 设置为 false ：只有往session中存数据时才分配钥匙
    saveUninitialized: false
}))


//把路由挂载到app中
app.use(router)

// 配置一个 404 处理中间件
app.use(function (req, res) {
    console.log('global error')
})

app.listen(5000, function () {
    console.log('blog is running...')
})