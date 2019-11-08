import React, {useState,} from 'react';
import {withAuth} from '../context/AuthProvider'
import EditUser from './EditUser'
import styled from 'styled-components'

const Profile = (props) => {
  const [toggle, setToggle] = useState(false)
    const currentUser = [props.user]
  
  const toggler = () => {
    setToggle(prev => (!prev))
  }
  
  return (
    <div>
      {currentUser.map( you => {
        return <>{!toggle ?

          <>

          <ProfileTitle>Your Profile</ProfileTitle>
                <h2 key={you._id}>your name: {you.name}</h2>
                  <h4> your email:{you.email}</h4>
                    <button onClick={toggler}>edit profile</button>
                    </>
                    :
                    <EditUser toggler={toggler} />
        }
              </>
      })}
      
    </div>
  );
};

export default withAuth(Profile);


const ProfileTitle = styled.h1`
  text-transform: uppercase;
`