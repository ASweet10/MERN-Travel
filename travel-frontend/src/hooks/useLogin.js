import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)     //Reset error to null every time new request made

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })
        //Success: Return information with JWT
        //Fail: Return error message
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)   //Set Error message equal to error property from json object
        }
        if(response.ok) {

            //Save user to local storage
            //Stringify the json object because local storage expects string
            localStorage.setItem('user', JSON.stringify(json))

            //Update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}