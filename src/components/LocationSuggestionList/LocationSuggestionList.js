import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './LocationSuggestionList.css'
import { List, message } from 'antd';


class LocationSuggestionList extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            hasMore: true,
        }

    }

    render() {


        return (
            <div className="demo-infinite-container">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    useWindow={false}
                    loadMore={() => { }}
                >
                    <List
                        dataSource={this.props.nearbyLocations}
                        renderItem={(location, index) => (
                            <div>
                                <List.Item onClick={() => {this.props.onLocationSelected(location)}}>{location.address}</List.Item>
                            </div>
                        )}
                    >
                    </List>
                </InfiniteScroll>
            </div>
        );
    }
}

export default LocationSuggestionList;