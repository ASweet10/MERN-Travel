import { useState } from 'react'
import { useTravelContext } from '../hooks/useTravelContext'
import { useAuthContext } from '../hooks/useAuthContext'

//
//
// Move this functionality to mapgl?
// handle submit, post to backend using await fetch and POST instead of axios.post
//
//

const TravelPinForm = () => {
    const { dispatch } = useTravelContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('') //Default to empty string
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (event) => {
        event.preventDefault()   //Prevent default action (page refresh)

        //No user, return from function & return error
        if( !user ) {
            setError('You must be logged in')
            return
        }

        const travelPin = {title, type, description}        

        const response = await fetch('/api/travelpins', {
            method: 'POST',
            body: JSON.stringify(travelPin), //Turn object into json string
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setEmptyFields([])
            setTitle('')
            setType('')
            setDescription('')
            setError(null) //Set error null in case there was one previously
            dispatch({type: 'CREATE_PIN', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a pin</h3>

            <label>Title</label>
            {/* Fire event on click, set equal to input's value */}
            <input 
                type="text"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Type</label>
            <input 
                type="string"
                onChange={(event) => setType(event.target.value)}
                value={type}
                className={emptyFields.includes('type') ? 'error' : ''}
            />

            <label>Description</label>
            <input 
                type="string"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <button className="material-symbols-outlined">Add</button>
            {/*If error exists, create error div */}
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TravelPinForm