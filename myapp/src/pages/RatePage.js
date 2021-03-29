import Messages from '../components/Messages';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from "../apis/firebase";
import NavBar from '../components/navBar';
import Loading from '../components/Loading';
import {useAuthState} from 'react-firebase-hooks/auth'


const RatePage=()=>{
    const [user, loading,error] = useAuthState(auth);
    if(!user&&loading){
        return <Loading/>
    }
    if(error){
        return <h1>Error!</h1>
    }
  return (
    <>
    <NavBar/>
    <div className="container mt-4">
          
      <div className="row content ">
        
      <Messages/>
      
      </div>
    </div>
    <ToastContainer/>
    </>    
  );
}

export default RatePage;