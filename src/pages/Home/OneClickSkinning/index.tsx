import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default function OneClickSkinning() {
  const menu = (
    <Menu
      items={[
        {
          label: '淡紫色',
          key: '0',
        },
        {
          label: '淡蓝色',
          key: '1',
        },
        {
          label: '肤色',
          key: '2',
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu} trigger={['click']} overlayStyle={{ width: 200 }}>
      <Space>
        一键换肤
        <DownOutlined />
      </Space>
    </Dropdown>
  )
}