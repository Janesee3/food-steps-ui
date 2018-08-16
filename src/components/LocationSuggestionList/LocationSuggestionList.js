import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ReactDOM from 'react-dom';
import "./LocationSuggestionList.css";
import { List, Input } from "antd";

const Search = Input.Search

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
		var input = ReactDOM.findDOMNode(this.refs.input); //There is a better way to write this without findDOMnode
        this.searchBox = new this.props.google.maps.places.Autocomplete(input,
            { componentRestrictions: { country: 'sg' } });
        this.searchBox.addListener('place_changed', this.inputChangeHandler);
	}

	componentWillUnmount() {
        this.props.google.maps.event.clearInstanceListeners(this.searchBox);
	}
	
	inputChangeHandler = () => {
        const userLat = this.searchBox.getPlace().geometry.location.lat()
        const userLng = this.searchBox.getPlace().geometry.location.lng()
		const userAddress = this.searchBox.getPlace().formatted_address
		
		console.log(this.searchBox.getPlace(), userLat, userLng,userAddress)

        // Set User Selected Address
        // this.setState({
        //     userLocation: { ...this.state.userLocation, lat: userLat, lng: userLng, userAddress: userAddress }
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
				<Input placeholder="Search for a location" ref="input" />
				<div className="subtitle">SUGGESTED LOCATIONS</div>
				<div className="list-container">
					<InfiniteScroll
						initialLoad={false}
						pageStart={0}
						useWindow={false}
						loadMore={() => { }}
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
