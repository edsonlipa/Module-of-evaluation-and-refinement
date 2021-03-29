import React from 'react'
import {auth} from '../apis/firebase'
import SignOut from './singOut'

const NavBar =()=>{
    //here i'll should get the 'uid' for log or more functions
    
    const {photoURL}=auth.currentUser
    
    
    return (<nav className="navbar navbar-dark bg-primary p-0">
                    
                <a className="navbar-brand h-4 m-0" href={window.location.origin}>
                    <img src={window.location.origin+'/LogoKusisqa.png'} alt="logo" className="logoimg m-2 ml-3"/>
                    Kusisqa</a>
            
                <div className="form-inline float-right">
                    <SignOut/>
                    <div className="text-white h5 m-2" >{auth.currentUser.displayName}</div>
                    <img src={photoURL} alt="profile" className="profileimg mr-4"  />
                    
                </div>
                
            </nav>);
};
export default NavBar;