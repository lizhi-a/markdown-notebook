import { Layout } from 'antd'
import cs from 'classnames'

import HeaderCpn from '@/components/Header'
import MyContent from './Content'

import globalStyles from '@/common/global.less'

const { Header, Content, Footer } = Layout

export default function NewArticle() {

  return (
    <div className={globalStyles.root}>
      <Layout className={cs(
        'layout',
        globalStyles.layout
      )} >
        <Header className={globalStyles.header} >
          <HeaderCpn isSearch={false} />
        </Header>
        <Content className={globalStyles.content} >
          <MyContent />
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: 'transparent' }}>
          Email: 2507332458@qq.com
        </Footer>
      </Layout >
    </div>
  );
}
