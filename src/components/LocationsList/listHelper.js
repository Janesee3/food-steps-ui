import React from 'react';
import { List, Avatar, Rate } from 'antd';

export const detailedListItem = (eachItemInDataSourceArray) => {
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

export const simpleListItem = (eachItemInDataSourceArray) => {
    return (
        <List.Item>
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