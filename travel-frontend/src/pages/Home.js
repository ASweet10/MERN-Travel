import { useEffect } from 'react'
import { useTravelContext } from '../hooks/useTravelContext'
import { useAuthContext } from '../hooks/useAuthContext'

//Components
import MapGL from '../components/MapGL'

const Home = () => {
    const { travelPins, dispatch } = useTravelContext()
    const { user } = useAuthContext()

    //UseEffect runs once when component renders
    useEffect(() => {
        const fetchTravelPins = async () => {
            //Fetch workout data & store in response
            // Shortened from 'http://localhost:4000/api/travelpins', using proxy in package.json
            const response = await fetch('/api/travelpins', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            // If no error
            if(response.ok) {
                //payload is full array of workouts
                dispatch({type: 'SET_PINS', payload: response})
            }
        }

        if( user ) {
            fetchTravelPins()
        }

    //Dependency array parameter, only fires once (avoid multiple calls) 
    // Dispatch is a dependency of useEffect as it's an external function
    }, [ dispatch, user ])

    return (
        <div className="home">
            <MapGL />
        </div>
    )
}

export default Home