import React from "react";
import { List, Avatar, Rate } from "antd";
import { showDeleteModal } from "../UserLocationsPage/UserLocationsHelper";

const DetailedUserLocation = props => {
  const location = props.location;
  return (
    <List.Item
      actions={[
        <a onClick={() => props.showEditModal(props.location)}>
          edit
        </a>,
        <a
          onClick={() =>
            showDeleteModal(
              props.location,
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
          src="https://source.unsplash.com/featured/?dishes,food,fish"
        />
      }
    >
      <List.Item.Meta
        avatar={<Avatar src={location.avatar} />}
        title={<p>{location.locationName}</p>}
        description={location.globalLocation.geocodedLocationName}
      />

      {/* Content */}
      <div>
        <div>{`Created on: ${location.createdAt}`}</div>
        <div>{`Updated on: ${location.updatedAt}`}</div>
      </div>
      <div>
        <Rate allowHalf disabled defaultValue={2.5} />
      </div>
    </List.Item>
  );
};

export default DetailedUserLocation;
