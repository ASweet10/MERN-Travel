import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        //Default behavior is page refresh, disable
        e.preventDefault()

        await login( email, password )
    }

    return(
        <form className="login" onSubmit={ handleSubmit }>
            <h3>Log In</h3>

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

            <button disabled={isLoading}>Log In!</button>
            { error && <div className='error'>{ error }</div>}
        </form>
    )
}

export default Login