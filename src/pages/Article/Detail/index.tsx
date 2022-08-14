import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useParams, history } from 'umi'
import { marked } from 'marked'
import hljs from "highlight.js"
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'highlight.js/styles/monokai-sublime.css'
import { Card, Descriptions, Space, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
// 使用中文时间
moment.locale('zh-cn')

import { getArticleDetail, deleteTopic } from '@/services/blogs'
import { mapNumToSort } from '@/common/utils'

import styles from './style.less'

type paramsType = {
  id: string;
}
type topicType = {
  article: string;
  created_time: string;
  last_modified_time: string;
  model: number;
  nickname: string;
  title: string;
  userId: string;
  __v: number;
  _id: string;
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

export default function Detail() {
  const params = useParams<paramsType>()
  const [topic, setTopic] = useState<topicType>()

  const { run: getTopic } = useRequest((id: string) => getArticleDetail(id), {
    manual: true,
    onSuccess: (res) => {
      setTopic(res.topic)
    }
  })

  const { run: deleteTopicReq } = useRequest((id: string) => deleteTopic(id), {
    manual: true,
    onSuccess: (res) => {
      if (res?.code === 200) {
        history.push('/')
      }
    }
  })

  const editTopicAction = () => {
    history.push(`/article/new/${params.id}`)
  }

  const deleteTopicAction = () => {
    deleteTopicReq(params.id)
  }

  useEffect(() => {
    getTopic(params.id)
  }, [])

  return (
    <>
      <Card
        title={(
          <div>
            {topic?.title}
            <Space className={styles.headerIcon}>
              <Tooltip placement="top" title="编辑文章">
                <EditOutlined onClick={editTopicAction} />
              </Tooltip>
              <Tooltip placement="top" title="删除文章">
                <DeleteOutlined onClick={deleteTopicAction} />
              </Tooltip>
            </Space>
          </div>
        )}
        bordered={false}
        className={styles.content}
        style={{ width: 'auto', backgroundColor: 'transparent' }}
        headStyle={{ fontSize: 24, borderBottom: ' 1px solid #d3d3d3', fontWeight: 700 }}
        bodyStyle={{ padding: '0px' }}
      >
        <Descriptions className={styles.description}>
          <Descriptions.Item label="作者">
            {topic?.nickname}
          </Descriptions.Item>
          <Descriptions.Item label="分类">
            {mapNumToSort(topic?.model)}
          </Descriptions.Item>
          <Descriptions.Item label="发布日期">
            {moment(topic?.created_time).format('LL')}
          </Descriptions.Item>
          <Descriptions.Item label="最后更新日期">
            {moment(topic?.last_modified_time).format('LL')}
          </Descriptions.Item>
        </Descriptions>
        <article style={{ margin: 36 }}>
          {
            topic && (
              <p dangerouslySetInnerHTML={{ __html: marked.parse(topic.article) }}></p>
            )
          }
        </article>
      </Card>
    </>
  );
}
