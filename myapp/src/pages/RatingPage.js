// import MessagesList from '../components/MessagesList';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../apis/firebase";
import NavBar from "../components/navBar";
import Loading from "../components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../apis/firebase";
import MessageSlider from "../components/MessageSlider";
import { useEffect, useState } from "react";
import { Alert,Modal,Button } from "react-bootstrap";

const RatingPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [messages, setmessages] = useState([]);
  const [registred, setregistred] = useState(false);
  const [done, setdone] = useState(false);
  const [lgShow, setLgShow] = useState(true);                    

 

  const getData = async () => {
    const dictio_type={
      'Com':"Commitment",
      'Lik':"Liking",
      'Con':"Consistency",
    }
    const msgs = [];
    let codes={};
    
    if (user != null){
      await db.collection("Participant").where("email", "==", user.email).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
        // console.log(doc.data())
        
          codes=doc.data()
          });
        
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    }else{
      return;
    }
    
    if(codes.empty){
      setregistred('Usted No esta registrado para esta evaluacion')
      return ;
    }else{
      setdone(codes.done)
    }
    var messages_1 = await db.collection(dictio_type[codes['code_1'].substring(0,3)]).where("group_code", "==", codes['code_1']).get()
    messages_1.forEach((element) => {
      msgs.push({ ...element.data(), id: element.id });
      //console.log({...element.data(),id:element.id});
    });
    var messages_2 = await db.collection(dictio_type[codes['code_2'].substring(0,3)]).where("group_code", "==", codes['code_2']).get()
    messages_2.forEach((element) => {
      msgs.push({ ...element.data(), id: element.id });
      //console.log({...element.data(),id:element.id});
    });
    
    var messages_3 = await db.collection(dictio_type[codes['code_3'].substring(0,3)]).where("group_code", "==", codes['code_3']).get()
    messages_3.forEach((element) => {
      msgs.push({ ...element.data(), id: element.id });
      //console.log({...element.data(),id:element.id});
    });
    setmessages(msgs);
    

  };


  useEffect(() => {
    console.log('obteniendo data');
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        {/* <div className="alert alert-dismissible alert-success" >
          <strong>Instruciones!</strong> Aqui den ir las intrucciones y una
          breve explicacion de las metricas a usar
        </div> */}
        <Button variant='info' className='mb-2' onClick={() => setLgShow(true)}>Intrucciones</Button>
        
        <Alert variant='danger' show={registred}>
        {registred}</Alert>
        <Alert variant='success' show={done}>
        Usted ya ha realizado la calificacion de sus mensages</Alert>
        {((!registred) && (!done)&&user)?<MessageSlider slides={messages} setdata={setmessages} email={user.email}/>:null}
        
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
            Intrucciones
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
        </Modal>  
      </div>
      
    </>
  );
};

export default RatingPage;
