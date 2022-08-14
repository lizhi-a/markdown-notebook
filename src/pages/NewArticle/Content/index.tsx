import { Button, Form, Input, Select } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { useRequest } from 'ahooks'
import { history, useParams } from 'umi'
import { marked } from 'marked'
import hljs from "highlight.js"

import { newTopic, editTopic } from '@/services/blogs'
import { getArticleDetail } from '@/services/blogs'

import styles from './style.less'

const { Option } = Select

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
}

const validateMessages = {
  required: '${label} 必填'
}

type paramsType = {
  id: string;
}
interface onchangeEventType {
  currentTarget: object,
  target: {
    value: string
  }
}
interface onScrollEventType {
  target: {
    scrollTop: string
  }
}
interface markdownElType {
  current: {
    scrollTop: number
  }
}
interface topicType {
  nickname: string,
  title: string,
  model: number,
  article: string,
  id: string
}

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
  gfm: true, // 允许 Git Hub标准的markdown.
  pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
  sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  // tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
  breaks: true, // 允许回车换行（该选项要求 gfm 为true）
  smartLists: true, // 使用比原生markdown更时髦的列表
  smartypants: false, // 使用更为时髦的标点
})

export default function Content() {
  const [form] = Form.useForm()
  const textareaEl = useRef(null)
  const [textareaVal, setTextareaVal] = useState<string>("")
  const markdownEl = useRef<markdownElType>(null)
  const [markdownText, setmarkdownText] = useState<string>("")
  const params = useParams<paramsType>()

  const { run: getTopic } = useRequest((id: string) => getArticleDetail(id), {
    manual: true,
    onSuccess: (res) => {
      setTextareaVal(res.topic.article)
      setmarkdownText(marked.parse(res.topic.article))
      form.setFieldsValue({
        title: res.topic.title,
        model: res.topic.model
      })
    }
  })

  const { run: newTopicReq } = useRequest((topic: topicType) => newTopic(topic), {
    manual: true,
    onSuccess: (result) => {
      if (result?.response?.data?.err_code === 500) {
        alert('新建博客失败')
        history.push('/')
      }
      else {
        history.push(`/article/detail/${result.data._id}`)
      }
    }
  })

  const { run: editTopicReq } = useRequest((topic: topicType) => editTopic(topic), {
    manual: true,
    onSuccess: (result) => {
      if (result?.response?.data?.err_code === 500) {
        alert('更新博客失败')
      }
      history.push(`/article/detail/${params.id}`)
    }
  })

  useEffect(() => {
    getTopic(params.id)
  }, [params.id])

  const onFinish = (topic: topicType) => {
    topic.nickname = "荔枝糖"
    topic.id = params.id
    if (params.id) {
      topic.article = textareaVal
      editTopicReq(topic)
    }
    else {
      newTopicReq(topic)
    }
  }

  const onChange = ({ target }: onchangeEventType) => {
    const { value } = target
    setTextareaVal(value)
    setmarkdownText(marked.parse(value))
  }

  const setScroll = ({ target }: onScrollEventType) => {
    // @ts-ignore
    markdownEl.current.scrollTop = target.scrollTop
  }

  return (
    <Form {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      className={styles.form}
      form={form}
    >
      <Form.Item
        name='title'
        label="标题"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='model'
        label="分类"
        rules={[{ required: true }]}
      >
        <Select
          style={{ width: '100%' }}
        >
          <Option value={0}>技术分享</Option>
          <Option value={1}>bug 记录</Option>
          <Option value={2}>周报</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name='article'
        label="文章内容"
        rules={[{ min: 10, message: '名称不得少于10个字符' }]}
        className={styles.markdownArticle}
      >
        <div className={styles.markdownDiv}>
          <Input.TextArea
            onChange={onChange}
            // @ts-ignore
            onScroll={setScroll}
            ref={textareaEl}
            value={textareaVal}
          />
          <div
            // @ts-ignore
            ref={markdownEl}
            dangerouslySetInnerHTML={{ __html: markdownText }}
            className={styles.markdownText}
          ></div>
        </div>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form >
  );
}
