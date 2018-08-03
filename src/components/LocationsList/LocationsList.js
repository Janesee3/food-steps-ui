import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { List } from 'antd';
import { detailedListItem, simpleListItem } from './listHelper'

const LocationsList = (props) => {
  const paginationProps = {
    onChange: (page) => {
      console.log(page);
    },
    pageSize: 2,
  }

  return (
    <div className={props.detailed ? "detailed-locations-list": "simple-locations-list"}>
      <List
        itemLayout="vertical"
        size="small"
        pagination={props.detailed ? paginationProps : false}
        // DataSource takes in an array that renderItem will map through
        dataSource={props.userLocations}
        // footer={<div><b>ant design</b> footer part</div>}
        renderItem={eachItemInDataSourceArray => props.detailed ? detailedListItem(eachItemInDataSourceArray) : simpleListItem(eachItemInDataSourceArray)}
      />
    </div>
  );
}

export default LocationsList;










