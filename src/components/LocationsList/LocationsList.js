import React from "react";
import "antd/dist/antd.css";
import "../../index.css";
import { List } from "antd";
import DetailedUserLocation from "../DetailedUserLocation/DetailedUserLocation";
import SimpleUserLocation from "../SimpleUserLocation/SimpleUserLocation";

const PAGE_SIZE = 3;

const renderDetailedOrSimple = (
  isDetailed,
  userLocation,
  props,
  foodPlacesListIndex
) => {
  console.log(`IN renderDetailedOrSimple: ${foodPlacesListIndex}, location: ${userLocation.locationName}`);
  return isDetailed ? (
    <DetailedUserLocation
      location={userLocation}
      onUserConfirmDelete={props.onUserConfirmDelete}
      foodPlacesListIndex={foodPlacesListIndex}
      showEditModal={props.showEditModal}
    />
  ) : (
    <SimpleUserLocation location={userLocation} />
  );
};

const LocationsList = props => {
  let currentPage = 1;
	const paginationProps = {
    onChange: (page) => {
      console.log('PAGE', page);
      currentPage = page;
    },
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
        renderItem={(userLocation, foodPlacesListIndex) =>
          renderDetailedOrSimple(
            props.detailed,
            userLocation,
            props,
            foodPlacesListIndex
            // (currentPage - 1) * PAGE_SIZE + foodPlacesListIndex
          )
        }
      />
    </div>
  );
};

export const testExports = {
	renderDetailedOrSimple
};

export default LocationsList;
