import React, {useEffect, useState} from 'react';
import {GoogleMap, Marker, Polyline, useJsApiLoader} from "@react-google-maps/api";

import './MapPage.css';

export interface GraphResult {
    lat: number,
    lng: number,
}

export interface MapPageProps {
    markers: GraphResult[]
}


const MapPage: React.FC<MapPageProps> = ({markers}) => {

    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);

    useEffect(() => {
        async function getLocation() {
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    if (!navigator.geolocation) {
                        reject(new Error('Geolocation is not supported.'));
                    }

                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const {latitude, longitude} = position.coords;
                console.log(latitude, longitude)
                setLat(latitude);
                setLng(longitude);

            } catch (error) {
                console.error(error);
            }
        }

        getLocation().then(r => console.log(r));
    }, []);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBmIB2FvvOzDg3jLMAob_WsJ5P7oX89RXE"
    })

    const containerStyle = {
        width: '100%',
        height: '100%'
    }

    return <div className="map">
        {
            isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{lat: lat, lng: lng}}
                    zoom={13}
                >
                    {markers.map((marker, index) => (
                        <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
                    ))}
                </GoogleMap>
            ) : <></>
        }
    </div>
};

export default MapPage;