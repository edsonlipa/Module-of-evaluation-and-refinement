import React from 'react'
import {auth} from '../apis/firebase'
import SignOut from './singOut'

const NavBar =()=>{
    //here i'll should get the 'uid' for log or more functions
    
    const user=auth.currentUser
    var username, photoURL;
    // var  email, uid, emailVerified;
    if (user != null) {
        username = user.displayName;
        // email = user.email;
        photoURL = user.photoURL;
        // emailVerified = user.emailVerified;
        // uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                         // this value to authenticate with your backend server, if
                         // you have one. Use User.getToken() instead.
      }
    
    return (<nav className="navbar navbar-dark bg-primary p-0">
                    
                <a className="navbar-brand h-4 m-0" href={window.location.origin}>
                    <img src={window.location.origin+'/LogoKusisqa.png'} alt="logo" className="logoimg m-2 ml-3"/>
                    Kusisqa</a>
            
                <div className="form-inline float-right">
                    <SignOut/>
                    <div className="text-white h5 m-2" >{username}</div>
                    <img src={photoURL} alt="profile" className="profileimg mr-4"  />
                    
                </div>
                
            </nav>);
};
export default NavBar;