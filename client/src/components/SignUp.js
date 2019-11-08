import React, {useState} from 'react'
import { withAuth } from '../context/AuthProvider.js'
import { Link } from 'react-router-dom'


const SignUp = props => {
    const [hide, setHide] = useState(true)
  

    
     
    
      const { name, email, password, passwordConfirmation, handleChange, handleSubmit, } = props
      
      const passwordHider = () => {
        setHide(hide => (!hide))
      }

      const checkPassword = (password, passwordConfirmation) => {
        if(password !== passwordConfirmation){
            alert('password and password confirmation do not match')
        }
      }

    return(
        <div>
            <div style={{border: '1px solid black', padding: 5, margin: 5, textAlign: 'center'}}>
                <h1>Blog It Up!</h1>
                <p>Sign up to view blog posts.</p>
                <form  onSubmit={ handleSubmit} style={{display: 'block'}}>
                    <input 
                        placeholder="Full Name" 
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                    <br />
                    <input placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <br />
                    <input placeholder="Password"
                    type={hide ? 'password' : '' }
                    name="password"
                    value={password}
                    onChange={handleChange}
                    />
                    <br />
                    <input placeholder="Confirm Password"
                    type={hide ? 'password' : '' }
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={handleChange}
                    />
                    <br />
                    <button onClick={localStorage.getItem('token') !== null ? props.history.push('/allblogposts') : null}>Sign up</button>
                </form>
                <button onClick={passwordHider}>{hide ? "show password" : "hide password"}</button>
            </div>
            <div style={{border: '1px solid black', padding: 5, margin: 5, textAlign: 'center'}}>
                <p>Have an account?</p>
                <Link to='/login'> Log in</Link>
            </div>
        </div>
    )
}

export default withAuth(SignUp)