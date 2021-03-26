import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import Login from './Firebase_Login';
import Menu from './Menu';
import {auth} from '../apis/firebase'

const Home =()=>{
  const [user] = useAuthState(auth);

    return (
        <>{user?<Menu/>:<Login/>}
        </>
    );
}
export default Home;