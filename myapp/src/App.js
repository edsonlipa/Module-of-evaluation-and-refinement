import './App.css';
//import MessageForm from './components/MessageForm';
import Messages from './components/Messages';
//import 'compo'
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
      <a className="navbar-brand" href="http://localhost:3000/">Refinador de Mensajes</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
    <div className="container mt-4">
          
      <div className="row content ">
        
      <Messages/>
      
      </div>


    </div>
    <ToastContainer/>
    </>    
  );
}

export default App;
