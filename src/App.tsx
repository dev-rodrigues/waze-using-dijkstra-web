import React, {useEffect, useState} from 'react';
import MapPage, {GraphResult, MapPageProps} from "./pages/MapPage";
import axiosInstance from "./api/axiosConfig";

type GraphResponse = {
    name: string,
    lat: number,
    lng: number,
}

function App() {

    const [ result, setResult ] = useState<MapPageProps>();

    useEffect(() => {
        axiosInstance.get<GraphResponse[]>('/graph/').then((response) => {
            const graphData = response.data;
            const namedData = graphData.map((item) => {
                return {
                    lat: item.lat,
                    lng: item.lng,
                }
            });

            const mapPageData: MapPageProps = {
                markers: namedData
            };

            setResult(mapPageData);
        });
    }, []);

    return (
        <MapPage markers={
            result?.markers || []
        }/>
    );
}

export default App;
