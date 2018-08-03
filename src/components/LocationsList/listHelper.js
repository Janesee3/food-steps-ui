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
        extra={<img width={200} alt="logo" src="https://orig00.deviantart.net/a39f/f/2013/084/5/1/cat_drawing_by_blacktailedwolf-d5zak6l.png" />}
    >
        <List.Item.Meta
            avatar={<Avatar src={eachItemInDataSourceArray.avatar} />}
            title={<a href={eachItemInDataSourceArray.href}>{eachItemInDataSourceArray.locationName}</a>}
            description={eachItemInDataSourceArray.globalLocation.geocodedLocationName}
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
                description={eachItemInDataSourceArray.globalLocation.geocodedLocationName}
            />

            {/* Content */}
            {eachItemInDataSourceArray.sahil}
        </List.Item>);
}