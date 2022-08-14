import { useEffect, useState, useContext } from 'react'
import { useRequest } from 'ahooks'
import { useParams, Link } from 'umi'
import { Input, Space } from 'antd'

import { getTotal } from '@/services/blogs'
import { getArticleDetail } from '@/services/blogs'
import { TopicListContext } from '@/common/context'

import styles from './style.less'

const { Search } = Input

type myProps = {
  isSearch: boolean;
}
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

export default function Header({ isSearch }: myProps) {
  const params = useParams<paramsType>()
  const { pathname } = window.location
  // 获取某个文章的标题和url
  const [topic, setTopic] = useState<topicType>()
  const [totalTopic, setTotalTopic] = useState<topicType[]>()
  const { setSearchResult } = useContext(TopicListContext)

  // 点击搜索后调用
  const onSearch = (value: string) => {
    if (Array.isArray(totalTopic)) {
      let arr = totalTopic.filter(item => {
        return item.title.includes(value)
      })
      setSearchResult(arr)
    }
  }
  // 获取某个文章的标题和url
  const { run: getTopic } = useRequest((id: string) => getArticleDetail(id), {
    manual: true,
    onSuccess: (res) => {
      setTopic(res.topic)
    }
  })
  // 获取全部topic
  const { run } = useRequest(getTotal, {
    manual: true,
    onSuccess: (result) => {
      setTotalTopic(result.data)
    }
  })

  useEffect(() => {
    run()
  }, [])

  useEffect(() => {
    if (pathname === '/') onSearch('')
  }, [totalTopic])

  useEffect(() => {
    getTopic(params.id)
  }, [params.id])

  return (
    <>
      <Space>
        <Link className={styles.link} to="/">&gt; 荔枝的博客</Link>
        {
          topic && (
            <Link className={styles.link} to={`/article/detail/${topic._id}`}>
              &gt; {topic.title}
            </Link>
          )
        }
      </Space>
      {
        isSearch && (
          <Search
            placeholder="请输入文章关键字"
            onSearch={onSearch}
            enterButton
            style={{
              display: ' inline-block',
              width: 300,
              verticalAlign: 'middle'
            }}
          />
        )
      }
    </>
  );
}
