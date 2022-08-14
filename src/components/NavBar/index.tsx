import { Button } from 'antd'
import { Link } from 'umi'

import styles from './style.less'

export default function navBar() {

  return (
    <div className={styles.navBar}>
      <Link to="/article/new" target="_blank">
        <Button type="primary">写博客</Button>
      </Link>
    </div>
  );
}
