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
        <Button variant='info' className='mb-2' onClick={() => setLgShow(true)}>Information</Button>
        
        <Alert variant='danger' show={registred}>
        {registred}</Alert>
        <Alert variant='success' show={done}>
        Thank you for your cooperation, your rating has been sent</Alert>
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
              WELCOME!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Card
            className="mb-2 mt-2 "
          >
            <Card.Header className='h5'>Goals</Card.Header>
            <Card.Body>
              <Card.Text className='h5'>
                
              <p>
              In our research we seek to generate messages / persuasive text automatically with the help of Neural Networks more specifically (GAN) classified in 3 persuasion principles.
              </p>
              <p>
              The objective of this experiment is the evaluation of the quality of the generated text, testing the understandability of the text and the correct assignment of its classification.
              </p>
              <p>
              Through this study you will be able to participate by rating intelligibility and if classification taking into account 3 principles of persuasion. 
              </p> 
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg='info'
            className="mb-2 mt-2 "
          >
            <Card.Header className='h5'>Context of the Training Corpus</Card.Header>
            <Card.Body>
              <Card.Text className='h5'>
              The dataset we use for training is a collection of hostage negotiation transcripts cataloged in the principles of cialdini.
                  <br></br>
                  <small>A Microtext Corpus for Persuasion Detection in Dialog(2011),Young, Joel, et al</small>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg='success'
            className="mb-2 mt-2"
          >
            <Card.Header className='h5'>Cialdini's Principles of Persuasion</Card.Header>
            <Card.Body>
              <Card.Text className='h5'>
                  <li><strong>Commitment</strong> (Compromiso):
                  People tend to be consistent in what they have said, written or committed.</li>
                  <br></br>
                  <li><strong>Liking</strong> (Simpatia):
                  People prefer to say "yes" to those for whom they have sympathy, good vibes or like.</li>
                  <br></br>
                  <li><strong>Consistency</strong> (Consistencia):
                  People tend to follow those who show consistency in their words or who are proficient in a topic.</li>
              </Card.Text>
            </Card.Body>
          </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => setLgShow(false)}>OK!</Button>
          </Modal.Footer>
        </Modal>  
      </div>
      
    </>
  );
};

export default RatingPage;
