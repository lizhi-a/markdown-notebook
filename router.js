var Topic = require('./modules/topic')
var Comment = require('./modules/comment')
var express = require('express')

var router = express.Router()

router.get('/', function (req, res) {
    Topic.find(function (err, topics) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Server error'
            })
        }
        res.send({
            "code": 200,
            "msg": "success",
            "data": topics.reverse()
        })
        return topics
    })
})

// 提交文章
router.post('/topics/new', function (req, res) {
    //1.获取表单提交的数据,req.body
    //2.操作数据库
    //  存入数据库user topics
    //3.发送响应
    var body = req.body
    // body.nickname = req.session.user.nickname
    body.userId = "000"
    new Topic(body).save(function (err, data) {
        if (err) {
            console.log('error', err)
            return res.status(500).json({
                err_code: 500,
                message: 'Server error'
            })
        }
        res.status(200).json({
            err_code: 0,
            message: 'OK',
            data: data
        })
    })
})

// 获取文章详细内容
router.get('/topics/show', function (req, res) {
    const id = (req.query.id).replace(/\"/g, "")
    Topic.findOne({
        _id: id
    }, function (err, topic) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Server error'
            })
        }
        Comment.find({
            articleId: req.query.id
        }, function (err, comments) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Server error'
                })
            }

            res.send({
                "code": 200,
                "msg": "success",
                "topic": topic,
                // "user": req.session.user,
                "comments": comments,
            })
        })
    })
})

// 编辑文章内容
router.post('/myblog/update', function (req, res) {
    //1.获取表单提交的数据,req.body

    //2.操作数据库
    //  存入数据库user topics
    //3.发送响应
    var body = req.body
    console.log('body', body)
    const id = (body.id).replace(/\"/g, "")

    Topic.findOneAndUpdate({
        _id: id
    }, {
        model: body.model,
        title: body.title,
        article: body.article
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Server error'
            })
        }
        res.status(200).json({
            id: body.id,
            err_code: 0,
            message: 'OK'
        })
    })
})

// 删除文章内容
router.get('/settings/myblog/delete', function (req, res) {
    const id = (req.query.id).replace(/\"/g, "")
    Topic.remove({
        _id: id
    }, function (err, comment) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                err_code: 500,
                message: 'Server error'
            })
        }
        res.send({
            "code": 200,
            "msg": "delete success",
        })
    })
})

module.exports = router