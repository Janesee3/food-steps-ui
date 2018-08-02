import React from 'react';
import { List, Avatar, Rate, Icon } from 'antd';

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);


export const detailedListItem = (eachItemInDataSourceArray) => {
    return (<List.Item
        actions={[<a>edit</a>, <a>more</a>]}
        extra={<img width={200} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
    >
        <List.Item.Meta
            avatar={<Avatar src={eachItemInDataSourceArray.avatar} />}
            title={<a href={eachItemInDataSourceArray.href}>{eachItemInDataSourceArray.locationName}</a>}
            description={eachItemInDataSourceArray.feedback}
        />

        {/* Content */}
        <div>
            <div>
                {`Created on: ${eachItemInDataSourceArray.createdAt}`}
            </div>
            <div>
                {`Updated on: ${eachItemInDataSourceArray.updatedAt}`}
            </div>
        </div>
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
                title={
                    <a href={eachItemInDataSourceArray.href}>
                        {eachItemInDataSourceArray.locationName} {` | `}
                        <IconText type="star" text={eachItemInDataSourceArray.rating} />
                    </a>
                }
                description={eachItemInDataSourceArray.feedback}
            />

            {/* Content */}
            {eachItemInDataSourceArray.sahil}
        </List.Item>);
}