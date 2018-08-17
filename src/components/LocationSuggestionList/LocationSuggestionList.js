import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ReactDOM from "react-dom";
import "./LocationSuggestionList.css";
import { List, Input } from "antd";
import { notifyError } from "../../utils/notificationManager";

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

	componentDidMount = () => {
		const input = ReactDOM.findDOMNode(this.refs.input); //There is a better way to write this without findDOMnode
		this.searchBox = new this.props.google.maps.places.Autocomplete(input, {
			componentRestrictions: { country: "sg" }
		});
		this.searchBox.addListener("place_changed", this.inputChangeHandler);
	};

	componentWillUnmount() {
		this.props.google.maps.event.clearInstanceListeners(this.searchBox);
	}

	inputChangeHandler = () => {
		const searchResult = this.searchBox.getPlace();

		if (!searchResult.formatted_address) {
			return notifyError("Please select a valid address!");
		}

		const address = `${searchResult.name}, ${searchResult.formatted_address}`;

		const location = {
			address,
			placeId: searchResult.place_id,
			location: {
				lat: searchResult.geometry.location.lat(),
				lng: searchResult.geometry.location.lng()
			}
		};

		this.getSelected(location);
	};

	getSelected = (location, index) => {
		this.props.onLocationSelected(location);
		this.setState({
			selectedListIndex: index
		});
	};

	render() {
		return (
			<div className="locations-selection">
				<div className="subtitle">SEARCH LOCATION</div>
				<Input placeholder="Search..." ref="input" />
				<div className="subtitle">SUGGESTED LOCATIONS NEAR ME</div>
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
