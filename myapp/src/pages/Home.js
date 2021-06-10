import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import Login from './Firebase_Login';
import Menu from './Menu';
import {auth} from '../apis/firebase'
import Loading from '../components/Loading';
import RatingPage from './RatingPage';
import Acceptance from './Acceptance';


const Home =()=>{
    const [user, loading] = useAuthState(auth);
    if(!user&&loading){
        return <Loading/>
    }

    return(
        <>{user?<Acceptance/>:<Login/>}
        </>
    );
}
export default Home;