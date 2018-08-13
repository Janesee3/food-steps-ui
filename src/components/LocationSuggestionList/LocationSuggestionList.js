import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import "./LocationSuggestionList.css";
import { List } from "antd";

class LocationSuggestionList extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			loading: false,
			hasMore: true,
			selectedListIndex: null
		};
	}

	getSelected = (location, index) => {
		this.props.onLocationSelected(location);
		this.setState({
			selectedListIndex: index
		});
	};

	render() {
		return (
			<div className="locations-selection">
				<div className="subtitle">SUGGESTED LOCATIONS</div>
				<div className="list-container">
					<InfiniteScroll
						initialLoad={false}
						pageStart={0}
						useWindow={false}
						loadMore={() => {}}
					>
						<List
							dataSource={this.props.nearbyLocations}
							renderItem={(location, index) => (
								<div
									className={
										this.state.selectedListIndex === index
											? "selected-list-item"
											: "list-item"
									}
								>
									<List.Item
										onClick={() => {
											this.getSelected(location, index);
										}}
									>
										<div className="list-content">{location.address}</div>
									</List.Item>
								</div>
							)}
						/>
					</InfiniteScroll>
				</div>
			</div>
		);
	}
}

export default LocationSuggestionList;
