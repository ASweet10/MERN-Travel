import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        //Return original state, no changes
        default:
            return state
    }
}

//Children are components wrapped by this ContextProvider in index.js
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    //Fire useEffect hook once when component is rendered
    useEffect(() => {
        //Use parse because localStorage.getItem('user') is a json string
        //-Parse into object we can use in JavaScript
        const user = JSON.parse(localStorage.getItem('user'))

        if(user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    console.log('AuthContext state: ' + state)

    return (
        //AuthContent component
        //Use spread syntax on state. Currently returning {user, dispatch function}
        <AuthContext.Provider value = { {...state, dispatch} }>
            { children }
        </AuthContext.Provider>
    )
}