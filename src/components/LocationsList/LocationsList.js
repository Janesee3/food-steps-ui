
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { List, Avatar, Icon, Rate } from 'antd';

const listData = [];
for (let i = 1; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `Location Name ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Description',
    content: 'Content.',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

ReactDOM.render(
  
  <List
    itemLayout="vertical"
    size="small"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 2,
    }}
    dataSource={listData}
    footer={<div><b>ant design</b> footer part</div>}
    renderItem={item => (
      <List.Item
        actions={[<a>edit</a>, <a>more</a>]}
        extra={<img width={200} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
        <div>
        <Rate allowHalf defaultValue={2.5} />
        </div>
      </List.Item>
    )}
  />,
  document.getElementById('container'));
