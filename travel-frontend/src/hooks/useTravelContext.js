import { TravelContext } from '../context/TravelContext'
import { useContext } from 'react'

export const useTravelContext = () => {
    const context = useContext(TravelContext)

    //Checks to see if context is used within scope of WorkoutContextProvider in Index.js
    if(!context) {
        throw Error('useTravelContext must be used inside a TravelContextProvider')
    }

    return context
}