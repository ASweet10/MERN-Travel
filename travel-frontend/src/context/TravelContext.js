import { createContext, useReducer } from 'react'

export const TravelContext = createContext()

//Previous state, action to take
export const travelReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PINS':
            return {
                //Payload is array of workouts
                // -Passed into "dispatch" in WorkoutsContextProvider
                travelPins: action.payload
            }
        case 'CREATE_PIN':
            return {
                //-Pass new workout into array
                //-Use spread (...) operator to copy existing array into new array
                travelPins: [action.payload, ...state.pins]
            }
        case 'DELETE_PIN':
            return {
                //Use filter to keep all workouts that don't have given (deleted) id
                travelPins: state.travel.filter((travel) => travel._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const TravelContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(travelReducer, {
        travelPins: null
    })

    return (
        //Wrap all components so they have access to context
        <TravelContext.Provider value={{ ...state, dispatch}}>
            { children }
        </TravelContext.Provider>
    )
}