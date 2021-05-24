import React, { useState } from "react";
import {FaCloudUploadAlt, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import RateStaring from "./RateStaring";
import RateType from "./RateType";
import Loading from "./Loading";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { db } from "../apis/firebase";




const MessageSlider = (props) => {
  const [current, setcurrent] = useState(0);
  const [answersstars, setanswersstars] = useState({});
  const [answerstype, setanswerstype] = useState({});
  const [answertext, setanswertext] = useState({});
  const length = props.slides.length;

  const handlechange = (e,index) => {
    e.preventDefault();
    setanswertext({...answertext,[index]:e.target.value})
  };
  const nextSlide = () => {
    setcurrent(current === length - 1 ? length - 1 : current + 1);
  };
  const prevSlide = () => {
    setcurrent(current === 0 ? 0 : current - 1);
  };

  if (!Array.isArray(props.slides) || props.slides.length <= 0) {
    return <Loading/>;
  }

  const send_my_form=async()=>{
    const dictio_type={
      'Com':"Commitment",
      'Lik':"Liking",
      'Con':"Consistency",
    }
    if(Object.entries(answersstars).length===15 && Object.entries(answerstype).length===15){
      props.slides.map(async(msg, index)=>{
        let respuestas={
          'email': props.email,
          'inteligility': answersstars[index],
          'typeacuracy':answerstype[index],
          'message_update':(answertext[index]?answertext[index]:false),
        }
        

        const docref= await db.collection(dictio_type[msg.group_code.substring(0,3)]).doc(msg.id)
        
        await docref.get().then((doc)=>{
          console.log(doc.data())
          if(!('rating_1' in  doc.data())){
            docref.update({
              rating_1:respuestas
            })
          }else{
            docref.update({
              rating_2:respuestas
            })
          }
        })
        
        await db.collection("Participant").where("email", "==", props.email).limit(1).get().then((query) => {  
          const thing = query.docs[0];
          thing.ref.update({done:true});
        });
           
      })

      toast.success("Gracias por participar con nosotros", {
        onOpen: props => console.log('gracias'),
        onClose: props => window.location.reload(),
        autoClose: 4000,
        
    }); 
    }else{
      console.log('aun no llenaste todos los campos '+ Object.entries(answersstars).length +' '+ Object.entries(answerstype).length)
      toast.warn("Aun no llenaste todos los campos!")
    }
  }


  return (
    <section className="card card-body">
      
      {props.slides.map((msg, index) => {
        return (
            <div
              className={index === current ? "card card-body border-white" : " d-none"}
              key={index}  
            >
              Mensaje {index + 1}:
              <div className="alert alert-dismissible  alert-light">
                <h3><em>{msg["message"]}</em></h3>
              </div>
              <RateStaring  menssage={answersstars} id={index} send_data={setanswersstars}/>
              <RateType menssage={answerstype} id={index} send_data={setanswerstype}/>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Mejora el mensaje(Opcional)
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control name="textarea"  onChange={(e)=>{handlechange(e,index)}}  placeholder="Mensaje" />
                  </Col>
                </Form.Group>
              </Form>
            </div>
        );
      })}
      
      <div >
      
      <Button 
      className="float-left mt-3"
      onClick={prevSlide}>
        <FaArrowAltCircleLeft
          size="40"
        />
          <p className="m-5 d-inline">Anterior</p>
        </Button> 
        
        <Button         
          onClick={nextSlide}
          className="float-right mt-3">
            <p className="m-5 d-inline">Siguiente</p>
            <FaArrowAltCircleRight
            size="40"
          />  
        </Button> 
        <Button 
        variant='success'
        className="mx-auto d-block mt-3"
        onClick={send_my_form}>
          
          <FaCloudUploadAlt
          size="40"
        />
          <p className="m-3 d-inline">Enviar Calificaciones</p>
        </Button>
        {/* <FaArrowAltCircleLeft
          className="left-arrow d-inline button m-5 hover"
          onClick={prevSlide}
          size="50"
          title="Tooltip on top"
          data-placement="top"
          
        />
        <FaArrowAltCircleRight
          className="right-arrow d-inline m-5"
          onClick={nextSlide}
          size="50"
        /> */}
      </div>
      <ToastContainer/>
    </section>
  );
};

export default MessageSlider;
