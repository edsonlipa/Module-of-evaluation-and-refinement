import "react-toastify/dist/ReactToastify.css";
import { auth } from "../apis/firebase";
import NavBar from "../components/navBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../apis/firebase";
import MessageSlider from "../components/MessageSlider";
import { useEffect, useState } from "react";
import { Alert,Modal,Button, Card } from "react-bootstrap";

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
        

        {/* ------------------------------Modal information-------------------- */}
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              ¡BIENVENIDO!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Card
            className="mb-2 mt-2 "
          >
            <Card.Header className='h4'>Objetivos</Card.Header>
            <Card.Body>
              <Card.Text className='h4'>
                
              <p>
              En nuestra investigacion buscamos generar mensages/ texto persuasivo automaticamente 
              con ayuda de Redes Neuronales mas especificamente (GAN) clasificado en 3 principios de persuasion. 
            </p>
              <p>
              El objetivo de este experimento es la evaluacion de la calidad del texto generado poniendo a prueba
              la entendibilidad del texto y la correcta asiganacion de su clasificacion.
            </p>
            <p> Atraves de este estudio podras participar calificando la inteligibilidad y si clasificacion 
              teniendo en cuenta 3 principios de persuasion. 
              </p> 
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg='info'
            className="mb-2 mt-2 "
          >
            <Card.Header className='h4'>Contexto del Corpus de Entrenamiento</Card.Header>
            <Card.Body>
              <Card.Text className='h4'>
                  El conjunto de datos que utilizamos para el entrenamiento es una coleccion de trnascripciones de 
                  de negociacion de rehenes catalogadas en los principios de cialdini.
                  <br></br>
                  <small>A Microtext Corpus for Persuasion Detection in Dialog(2011),Young, Joel, et al</small>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg='success'
            className="mb-2 mt-2"
          >
            <Card.Header className='h4'>Principios de Persuasion de Cialdini</Card.Header>
            <Card.Body>
              <Card.Text className='h4'>
                  <li><strong>Commitment</strong> (Compromiso):
                  Las personas tienden a ser coherentes con lo que han dicho, escrito o se han comprometido.</li>
                  <br></br>
                  <li><strong>Liking</strong> (Simpatia):
                  La gente prefiere decir «si» a aquellos por los que tienen simpatía, buena onda o les gustan.</li>
                  <br></br>
                  <li><strong>Consistency</strong> (Consistencia):
                  Las personas tienden a seguir a quienes muestran coherencia en sus palabras o que dominan un tema.</li>
              </Card.Text>
            </Card.Body>
          </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => setLgShow(false)}>Entendido!</Button>
          </Modal.Footer>
        </Modal>  
      </div>
      
    </>
  );
};

export default RatingPage;
