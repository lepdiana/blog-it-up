import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withAuth, blogPostAxios } from './context/AuthProvider.js'
import ProtectedRoute from './auth/ProtectedRoute'
import Navbar from './components/Navbar.js'
import Profile from './auth/Profile.js'
import SignUp from './components/SignUp.js'
import Login from './components/Login.js'
import BlogList from './components/BlogList.js'
import Publish from './components/Publish.js'
import Favorites from './components/Favorites.js'
import { withCrud } from './context/CrudProvider.js'


const App = props => {
  const { token } = props
  
  return(<>
    
      <AppWideStyles>
    <Route render={ rProps => <Navbar {...rProps} />} />
      <Switch>
        <Route exact path='/' render={rProps => !token ? <SignUp /> : <Redirect to="/allblogposts"/>}/>
        <Route path='/login' render={rProps =>  !token ? <Login /> : <Redirect to='/allblogposts' />}/>
        <ProtectedRoute path='/allblogposts' component={BlogList}/>
        <ProtectedRoute path='/publishablogpost' component={Publish}/>
        <ProtectedRoute path='/profile' component={Profile} />
      
        <ProtectedRoute path='/favorites' component={Favorites}/>
      </Switch>
    </AppWideStyles>
    </>
  )
}

const AppWideStyles = styled.div`
margin-bottom: 25vh;
text-align: center;
button:focus{outline: none;}
button {
	box-shadow: 1px 3px 5px 1px #dae1e3;
	background:linear-gradient(to bottom, #bab1ba 5%, #c2c2c2 100%);
	background-color:#bab1ba;
	border-radius:22px;
	border:1px solid #c4c2c4;
	cursor:pointer;
	color: #474747;
	font-size:17px;
	padding:3px 29px;
	text-decoration:none;
	text-shadow:-1px 0px 9px #e1e2ed;
  transition: 0.8s;
}
button:hover {
	background:linear-gradient(to bottom, #c2c2c2 5%, #bab1ba 100%);
	background-color:#c2c2c2;
}
button:active {
	position:relative;
	top:1px;
}
`

export default withAuth(withCrud(App))

