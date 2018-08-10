import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './LocationSuggestionList.css'
import { List } from 'antd';


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
            <div className="locations-selection">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    useWindow={false}
                    loadMore={() => { }}
                >
                    <List
                        dataSource={this.props.nearbyLocations}
                        renderItem={(location, index) => (
                            <div className="list">
                                <List.Item onClick={() => { this.props.onLocationSelected(location) }}>
                                    <div className="list-content">
                                        {location.address}
                                    </div>
                                </List.Item>
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