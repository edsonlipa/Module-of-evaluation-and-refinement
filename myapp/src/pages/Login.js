import md5 from 'md5';
import React, {  useState } from 'react';
import { db } from "../firebase";
import Cookies from 'universal-cookie';
import { ToastContainer,toast } from 'react-toastify';



const cookies = new Cookies();


const Login =()=>{
    const logInitial={
        username:"",
        password:""
    };

    const [logForm,setlogForm]=useState(logInitial);
    const handlechange =(e)=>{
        if (e.target.name==='password') {
            setlogForm({...logForm,[e.target.name]:md5(e.target.value)});
            
        }else{
            setlogForm({...logForm,[e.target.name]:e.target.value});
        }
        console.log(logForm)
    }

    const callLogin= async()=>{
        if (logForm.username!=="") {
            
        
        await db.collection('users').doc(logForm.username).get().then(function(doc) {
            if (doc.exists){
              if (doc.data().password===logForm.password) {
                console.log("usuario registrado permitido");
                cookies.set('name',doc.data().name,{path:"/"});
                cookies.set('permissionType',doc.data().permissionType,{path:"/"});
                toast("Bienvenido!",{type: "success",}).then(
                    window.location.href="/menu"
                );
              }else{
                //window.confirm('usuario o contrasena equivocada')
                toast("usuario o contrasena equivocada",{type: "error",});
              }
            } else {
              console.log("No such document!")
            }}).catch(function(error) {
              console.log("Error getting document:", error)
            });
        }else{
            window.confirm("los campos no puden estar bacios");
        }
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
                <input type="text" className="form-control" name="username" onChange={handlechange}/>
            </div>
            <div className="form-group last mb-4">
            <label >Contraseña</label>
                <input type="password" className="form-control" name="password" onChange={handlechange}/>
            </div>
            <div className="d-flex mb-4 align-items-center">
            
            <span className="ml-auto"><a  className="forgot-pass">Olvidaste tu contraseña?</a></span>
            </div>
            <div onClick={callLogin} className="btn btn-success btn-lg  btn-block rounded-pill">Iniciar Sesion</div>
            <div  className="btn btn-lg text-white btn-block bg-secondary mb-4 rounded-pill">Registrate Aqui!</div>
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