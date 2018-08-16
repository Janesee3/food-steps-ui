import React, { Component } from "react";
import "../../index.css";
import { List } from "antd";
import DetailedUserLocation from "../DetailedUserLocation/DetailedUserLocation";
import SimpleUserLocation from "../SimpleUserLocation/SimpleUserLocation";

const PAGE_SIZE = 3;

const renderDetailedOrSimple = (
  props,
  userLocation,
  foodPlacesListIndex
) => {
  // console.log(`IN renderDetailedOrSimple: ${foodPlacesListIndex}, location: ${userLocation.locationName}`);
  return props.detailed ? (
    <DetailedUserLocation
      location={userLocation}
      foodPlacesListIndex={foodPlacesListIndex}
      onUserConfirmDelete={props.onUserConfirmDelete}
      showEditModal={props.showEditModal}
    />
  ) : (
    <SimpleUserLocation location={userLocation} />
  );
};

class LocationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this.paginationProps = {
      onChange: page => {
        this.setState({
          currentPage: page
        });
      },
      pageSize: PAGE_SIZE
    };
  }

  render() {
    return (
      <div
        className={
          this.props.detailed ? "detailed-locations-list" : "simple-locations-list"
        }
      >
        <List
          itemLayout="vertical"
          size="small"
          pagination={this.props.detailed ? this.paginationProps : false}
          // DataSource takes in an array that renderItem will map through
          dataSource={this.props.userLocations}
          // footer={<div><b>ant design</b> footer part</div>}
          renderItem={(userLocation, foodPlacesListIndex) =>
            renderDetailedOrSimple(
              this.props,
              userLocation,
              (this.state.currentPage - 1) * PAGE_SIZE + foodPlacesListIndex
            )
          }
        />
      </div>
    );
  }
}

export const testExports = {
  renderDetailedOrSimple
};

export default LocationsList;
