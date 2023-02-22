import { useAuthContext } from "./useAuthContext"
import { useTravelContext } from "./useTravelContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useTravelContext()

    const logout = () => {
        // Remove user from localStorage
        localStorage.removeItem('user')

        // Dispatch logout action
        dispatch({type: 'LOGOUT'})
        
        //Set workouts to null when user logs out
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return { logout }
}