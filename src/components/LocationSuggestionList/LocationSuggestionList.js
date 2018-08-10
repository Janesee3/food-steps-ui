import React from 'react';
import { List } from 'antd';

const LocationSuggestionList = (props) => {
    return (
        <div>
            <List
            dataSource={props.nearbyLocations}
            renderItem={location => (<List.Item>{location.address}</List.Item>)}
            >
            </List>
        </div>
    );
}

export default LocationSuggestionList;
