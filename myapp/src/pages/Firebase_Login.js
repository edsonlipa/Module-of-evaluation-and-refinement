import React from 'react';
//import { db } from "../firebase/";
import {auth} from "../apis/firebase";
import { ToastContainer } from 'react-toastify';
import {FcGoogle} from 'react-icons/fc'
import firebase from 'firebase'


const Login =()=>{
    const signInWithGoogle=()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
      }
   
    return(
        <>
        <div className="content jumbotron">
        <div className="container ">
        <div className="row justify-content-center">

        <div className="col-md-6 contents">
        <div className="row justify-content-center">
        <div className="col-md-12">
        <div className="form-block card card-body p-5">
        <div className="mb-4 text-center ">
        <h3>Bienvenid@ a <strong>Kusisqa!</strong></h3>
        <p className="mb-4"></p>
        </div>
        <form className="form-group">
            <div className="form-group first">
            <label >Usuario</label>
                <input type="text" className="form-control" name="username" />
            </div>
            <div className="form-group last mb-4">
            <label >Contraseña</label>
                <input type="password" className="form-control" name="password" />
            </div>
            <div className="d-flex mb-4 align-items-center">
            
            <span className="ml-auto"  ><a  className="forgot-pass" href={window.location.origin}>Olvidaste tu contraseña?</a></span>
            </div>
            <div  className="btn btn-success btn-lg  btn-block rounded-pill">Iniciar Sesion</div>
            <div  className="btn btn-lg text-white btn-block bg-secondary mb-4 rounded-pill">Registrate Aqui!</div>
            <span className="d-block text-center my-4 text-muted"> o </span>
            <div  className="btn btn-lg btn-outline-primary btn-block  mb-4 rounded-pill" onClick={signInWithGoogle}><FcGoogle/>  Inicia sesion con Google</div>

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
export default Login;