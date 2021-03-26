import React from 'react';
import { ToastContainer} from 'react-toastify';
//import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from "../apis/firebase";
import NavBar from '../components/navBar';


const Menu =()=>{
    const userName = auth.currentUser.displayName
    const WhenClicked =(e)=>{
        window.location.href='/application'
    }


    return(
        <>
        <NavBar/>
        <div className="content jumbotron">
        <div className="container ">
        <div className="row justify-content-center">

        <div className="col-md-6 contents">
        <div className="row justify-content-center">
        <div className="col-md-12">
        <div className="form-block card card-body p-5">
        <div className="mb-4 text-center ">
        <h3>Bienvenid@ {userName} a <strong>Kusisqa!</strong></h3>
        <p className="mb-4"></p>
        </div>
        <form className="form-group">
            <div onClick={WhenClicked} className="btn btn-success btn-lg  btn-block rounded-pill">Mensages Generados Automaticamente</div>
            <div  className="btn btn-lg text-white btn-block bg-secondary mb-4 rounded-pill">Mensajes Generados por Kusisqa</div>
        </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        <ToastContainer/>
        </>
    );
}
export default Menu;