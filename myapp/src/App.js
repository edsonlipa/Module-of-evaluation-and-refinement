import Messages from './components/Messages';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from "./apis/firebase";
import NavBar from './components/navBar';

function App() {
  return (
    <>
    <NavBar/>
    <div className="container mt-4">
          
      <div className="row content ">
        
      {auth.currentUser?<Messages/>:<h1>you arent logged yet!</h1>}
      
      </div>


    </div>
    <ToastContainer/>
    </>    
  );
}

export default App;
