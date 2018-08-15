import React from "react";
import { List, Avatar, Rate } from "antd";
import { showDeleteModal } from "../UserLocationsPage/userLocationHelper";

const DetailedUserLocation = props => {
  const location = props.location;
  return (
    <List.Item
      actions={[
        <a>edit</a>,
        <a
          onClick={() =>
            showDeleteModal(
              props.foodPlacesListIndex,
              props.onUserConfirmDelete
            )
          }
        >
          delete
        </a>
      ]}
      extra={
        <img
          width={200}
          alt="logo"
          src="https://orig00.deviantart.net/a39f/f/2013/084/5/1/cat_drawing_by_blacktailedwolf-d5zak6l.png"
        />
      }
    >
      <List.Item.Meta
        avatar={<Avatar src={location.avatar} />}
        title={<a href={location.href}>{location.locationName}</a>}
        description={location.globalLocation.geocodedLocationName}
      />

      {/* Content */}
      <div>
        <div>{`Created on: ${location.createdAt}`}</div>
        <div>{`Updated on: ${location.updatedAt}`}</div>
      </div>
      <div>
        <Rate allowHalf defaultValue={2.5} />
      </div>
    </List.Item>
  );
};

export default DetailedUserLocation;
