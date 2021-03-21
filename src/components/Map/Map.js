import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 26.673308,
    lng: 85.167339
};

function Map() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAuOePx2oFzhzrZlXQP2M9T32aYsPWw_k8"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default Map;