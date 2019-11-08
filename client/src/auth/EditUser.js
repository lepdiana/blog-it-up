import React, {useState} from 'react';
import {withRouter} from 'react-router-dom'
import {withAuth, blogPostAxios} from '../context/AuthProvider'
import useFormHandler from './CustomHooks'
import moment from 'moment'
import Axios from 'axios';

//make a method to regrex all the whitespace out of a token 

const EditUser = (props) => {
  const [hide, setHide] = useState(true)
  const [inputs, setInputs] = useState({})
  const [toggleForDelete] = useState(false)

  const { _id, token} = props.user
  const {toggler, } = props
  const { handleEdit,} = useFormHandler()




  

  const handleSubmit = (e) => {
    e.preventDefault()
    props.changeUserState( handleEdit(props.user._id, inputs) )
    toggler()
  }
  
  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs(inputs =>  ({...inputs, [name]: value, }))
}

  const passwordHider = () => {
    setHide(hide => (!hide))
  }
  const deleteAccount = (_id) => {

    
      if(localStorage.getItem('token')) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        sendToSignin()
      }

  }

  const sendToSignin = () => {
    return props.history.push('/')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>name</p>
        <input
          placeholder="name"
          name='name'
          value={inputs.name}
          onChange={handleChange}
        />
        <p>email</p>
        <input
          placeholder="email"
          name='email'
          value={inputs.email}
          onChange={handleChange}
        />

        <input
          type={hide ? 'password' : ''}
          placeholder="password"
          name='password'
          value={inputs.password}
          onChange={handleChange}
        /> 
        <button>Submit</button>

      </form>
        <button onClick={passwordHider}>{hide ? 'show password' : "hide password"}</button>
        <button onClick={ () => deleteAccount(_id)}>delete account</button>

      <button onClick={toggler}>hide form</button>
    </div>
  );
};

export default withRouter(withAuth(EditUser));