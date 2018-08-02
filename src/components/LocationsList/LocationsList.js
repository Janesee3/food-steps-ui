import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { List, Avatar, Icon, Rate } from 'antd';

// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// );

const listItem = (eachItemInDataSourceArray) => {
  return (<List.Item
    actions={[<a>edit</a>, <a>more</a>]}
    extra={<img width={200} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
  >
    <List.Item.Meta
      avatar={<Avatar src={eachItemInDataSourceArray.avatar} />}
      title={<a href={eachItemInDataSourceArray.href}>{eachItemInDataSourceArray.gender}</a>}
      description={eachItemInDataSourceArray.description}
    />

    {/* Content */}
    {eachItemInDataSourceArray.sahil}
    <div>
      <Rate allowHalf defaultValue={2.5} />
    </div>
  </List.Item>);
}

const LocationsList = (props) => {
  return (
    <div className="locations-list">
        <List
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 2,
          }}
          // DataSource takes in an array that renderItem will map through
          dataSource={props.userLocations}
          // footer={<div><b>ant design</b> footer part</div>}
          renderItem={eachItemInDataSourceArray => listItem(eachItemInDataSourceArray)}
        />
      </div>
  );
}

export default LocationsList;










