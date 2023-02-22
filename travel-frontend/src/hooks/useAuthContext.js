import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    //Checks to see if context is used within scope of AuthContextProvider in Index.js
    if(!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}