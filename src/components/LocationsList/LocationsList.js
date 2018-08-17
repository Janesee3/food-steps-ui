import React from "react";
import "../../index.css";
import { List } from "antd";
import DetailedUserLocation from "../DetailedUserLocation/DetailedUserLocation";
import SimpleUserLocation from "../SimpleUserLocation/SimpleUserLocation";

const PAGE_SIZE = 3;

const renderDetailedOrSimple = (props, userLocation) => {
  // console.log(`IN renderDetailedOrSimple: ${foodPlacesListIndex}, location: ${userLocation.locationName}`);
  return props.detailed ? (
    <DetailedUserLocation
      location={userLocation}
      onUserConfirmDelete={props.onUserConfirmDelete}
      showEditModal={props.showEditModal}
    />
  ) : (
    <SimpleUserLocation location={userLocation} />
  );
};

const LocationsList = props => {
  const paginationProps = {
    pageSize: PAGE_SIZE
  };
  return (
    <div
      className={
        props.detailed ? "detailed-locations-list" : "simple-locations-list"
      }
    >
      <List
        itemLayout="vertical"
        size="small"
        pagination={props.detailed ? paginationProps : false}
        // DataSource takes in an array that renderItem will map through
        dataSource={props.userLocations}
        // footer={<div><b>ant design</b> footer part</div>}
        renderItem={userLocation => renderDetailedOrSimple(props, userLocation)}
      />
    </div>
  );
};

export const testExports = {
  renderDetailedOrSimple
};

export default LocationsList;
