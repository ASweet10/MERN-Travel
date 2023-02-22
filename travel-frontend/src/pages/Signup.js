import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const { signup, isLoading, error } = useSignup()

    const handleSubmit = async (e) => {
        //Prevent default behavior (page refresh)
        e.preventDefault()

        await signup( email, password )
    }

    return(
        <form className="signup" onSubmit={ handleSubmit }>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input
                //Expects email address, not string
                type="email"
                //setEmail with value (e) supplied by input
                onChange={(e) => setEmail(e.target.value)}
                //If not changed, value is email from state
                // 2-way data binding
                value={ email }
            />

            <label>Password:</label>
            <input
                //Hides with *** while typing
                type="password"
                //setPassword with value (e) supplied by input
                onChange={(e) => setPassword(e.target.value)}
                //If not changed, value is password from state
                value={ password }
            />

            {/* If isLoading currently true from useSignup, disable button */}
            <button disabled={isLoading} >Sign Up!</button>
            {/* Display error here if it exists */}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup