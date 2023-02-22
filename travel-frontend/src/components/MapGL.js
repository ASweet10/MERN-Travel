import { useTravelContext } from '../hooks/useTravelContext'
import { useAuthContext } from '../hooks/useAuthContext'

import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { useState, useEffect } from 'react'
import { Room, Star, AddBox } from "@mui/icons-material"
import TravelPinForm from './TravelPinForm'
import "../App.css"
import Map from 'react-map-gl'


const MapGL = () => {
    const { travelPins, dispatch } = useTravelContext()
    const { user } = useAuthContext()
    const [ pins, setPins ] = useState([])
    const [ currentPlaceID, setCurrentPlaceID ] = useState(null)
    const [ newPlace, setNewPlace ] = useState(null)
    const [ title, setTitle ] = useState(null)
    const [ type, setType ] = useState(null)
    const [ desc, setDesc ] = useState(null)
    const [ viewport, setViewport ] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 46,
        longitude: 17,
        zoom: 4
    })

    //UseEffect runs once when component renders
    useEffect(() => {
        const getPins = async () => {
            try {
                const allPins = await fetch('/api/travelpins', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                setPins(allPins.data)
            } catch (err) {
                console.log(err)
            }
        }
    })

    const handleMapClick = ( id, lat, long ) => {
        if( !user ) {
            return
        }

        setCurrentPlaceID(id)
        setViewport({ ...viewport, latitude: lat, longitude: long })
    }
    const handleAddClick = ( event ) => {
        const { long, lat } = event.lngLat
        setNewPlace({ lat, long })
        console.log("chosen lat: " + lat)
    }
    const handleSubmitPin = async (event) => {
        event.preventDefault()
        const newPin = {
            username: user.email,
            title,
            type,
            desc,
            lat: newPlace.lat,
            long: newPlace.long
        }
        try {
            //const res = await axios.post("/pins", newPin);
            //setPins([...pins, res.data]);
            //setNewPlace(null);
          } catch (err) {
            console.log(err);
          }
    }

    return(
        <div className="map">
            <Map
                initialViewState={{
                    longitude: 17,
                    latitude: 46,
                    zoom: 4
                }}
                style={{width: 600, height: 400}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                onDblClick={handleAddClick}
            />
            {/*
            {pins && pins.map((pin) => (
                <Marker
                    latitude={pin.lat}
                    longitude={pin.long}
                    //offsetLeft={-viewport.zoom * 3.5}
                    //offsetTop={-viewport.zoom * 7}
                ></Marker>
            ))}
            */}

            {newPlace && ( 
            <Popup
                latitude={newPlace.lat}
                longitude={newPlace.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={()=> setNewPlace(null)}
            >
            </Popup>

            )}

        </div>
    )
}

export default MapGL