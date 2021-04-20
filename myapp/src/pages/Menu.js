import React from 'react';
import { ToastContainer} from 'react-toastify';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from "../apis/firebase";
import NavBar from '../components/navBar';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';



const Menu =()=>{
    const [user, loading,error] = useAuthState(auth);
    if(!user&&loading){
        return <Loading/>
    }
    if(error){
        return <h1>Error!</h1>
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
        <h3>Bienvenid@ a <strong>Kusisqa!</strong></h3>
        <p className="mb-4"></p>
        </div>
        <form className="form-group">
            <Link to="/editpage" className="btn btn-success btn-lg  btn-block rounded-pill">Visualizar y Editar Mensajes</Link>
            <Link to="/ratingpage" className="btn btn-success btn-lg  btn-block rounded-pill">Calificar Mensajes</Link>
            <div  className="btn btn-lg text-white btn-block bg-secondary mb-4 rounded-pill">Visualizar Mensajes (Publico)</div>
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