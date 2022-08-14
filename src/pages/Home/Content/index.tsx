import { useContext } from 'react'
import { history } from 'umi'
import { Col, Row, Space, Tag } from 'antd'
import { ProList } from '@ant-design/pro-components'
import moment from 'moment'
import 'moment/locale/zh-cn'
// 使用中文时间
moment.locale('zh-cn')

import { mapNumToSort } from '@/common/utils'
import { TopicListContext } from '@/common/context'

import globalStyles from '@/common/global.less'
import styles from './style.less'

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

const Topics: React.FC = () => {
  const { searchResult } = useContext(TopicListContext)

  return (
    <>
      <Row >
        <Col span={18}>
          <ProList<any>
            className={styles.topics}
            onRow={(record: any) => {
              return {
                onClick: () => {
                  history.push(`/article/detail/${record._id}`);
                },
              };
            }}
            rowKey="_id"
            headerTitle={<p>共{searchResult?.length}篇文章</p>}
            dataSource={searchResult}
            metas={{
              title: {
                render: (_, item: TopicsItem) => {
                  return (
                    <Space>
                      <span>{moment(item.created_time).format('LL')}</span>
                      »
                      <span>{item.title}</span>
                    </Space>
                  )
                }
              },
              description: {
                render: (_, item: TopicsItem) => {
                  return (
                    <p className={globalStyles.ellipsis}>
                      {item.article}
                    </p>
                  )
                }
              },
              subTitle: {
                render: (_, item: TopicsItem) => {
                  return (
                    <Space size={0}>
                      <Tag color="lightpink">{mapNumToSort(item.model)}</Tag>
                    </Space>
                  );
                },
              },
            }}
          />
        </Col>
        <Col span={6}>col-6</Col>
      </Row>
    </>)
}

export default Topics