import React from "react";
import LocationForm from "../LocationForm/LocationForm";
import SignInRequired from "../SignInRequired/SignInRequired";

const LocationFormContainer = props => {
	return props.isLoggedInUser ? <LocationForm /> : <SignInRequired />;
};

export default LocationFormContainer;
