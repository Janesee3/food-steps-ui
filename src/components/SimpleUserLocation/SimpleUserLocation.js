import React from "react";
import { List, Avatar, Icon } from "antd";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const SimpleUserLocation = props => {
  const location = props.location;
  return (
    <List.Item onClick={()=>console.log('List clicked')}>
      <List.Item.Meta
        avatar={<Avatar src={location.avatar} />}
        title={
          <a href={location.href}>
            {location.locationName} {` | `}
            <IconText type="star" text={location.rating} />
          </a>
        }
        description={
          location.globalLocation.geocodedLocationName
        }
      />

      {/* Insert Content here */}
    </List.Item>
  );
};

export default SimpleUserLocation;
