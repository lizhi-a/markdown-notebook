import 'normalize.css/normalize.css'

import NavBar from '@/components/NavBar'
import Home from './Home'

import '@/common/global.less'
import globalStyles from '@/common/global.less'
// import styles from './index.less';

export default function IndexPage() {

  return (
    <div className={globalStyles.root}>
      <NavBar />
      <Home />
    </div>
  );
}
