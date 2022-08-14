import { useState } from 'react'
import { Layout } from 'antd'
import cs from 'classnames'

import HeaderCpn from '@/components/Header'
import { TopicListContext } from '@/common/context'
import Topics from './Content'

import globalStyles from '@/common/global.less'
import styles from './style.less'

const { Header, Content, Footer } = Layout;

type TopicsItem = {
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

export default function Home() {
  const [searchResult, setSearchResult] = useState<TopicsItem[]>([])

  return (
    <Layout className={cs(
      'layout',
      globalStyles.layout,
      styles.layout
    )} >
      <TopicListContext.Provider value={{ searchResult, setSearchResult }}>
        <Header className={styles.header} >
          <HeaderCpn isSearch={true} />
        </Header>
        <Content className={styles.content} >
          <Topics />
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: 'transparent' }}>
          Email: 2507332458@qq.com
        </Footer>
      </TopicListContext.Provider >
    </Layout >
  )
}