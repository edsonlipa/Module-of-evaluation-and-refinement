import React, { useState } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../apis/firebase'
import Loading from '../components/Loading';
import NavBar from '../components/navBar';
import {Form, Button, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { db } from "../apis/firebase";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const Acceptance =()=>{
    const [user, loading] = useAuthState(auth);
    const data = {
        Acceptance:false,
        };
    const [form, setForm] = useState(data);

    const onValueChange=(event) =>{
        event.persist();
        setForm({...form,[event.target.name]:event.target.checked});
    }
    const Submit=async(event)=>{
        
        if(form.Acceptance!=false)
        {   console.log(user.email)
            await db.collection("Participant").where("email", "==", user.email).limit(1).get().then((query) => {  
                const thing = query.docs[0];
                thing.ref.update(form);
              });

        }else{
            console.log('no permitido')

            toast.warn("Aun no llenaste todos los campos!")

            event.preventDefault();
                
        }
    }
    if(!user&&loading){
        return <Loading/>
    }
    
    return(
        <><NavBar />
            <div className="container mt-4 pb-5">
                <h3 className="mt-4 d-flex justify-content-center">Welcome to our live study!</h3>
                <h4 className="mb-4 mt-4">Acceptance</h4>
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
          
                <Form>
                    <div  className="m-3">
                        <Form.Check
                            inline
                            label="I agree to participate as a qualifier of persuasive messages"
                            name="Acceptance"
                            type='checkbox'
                            onChange={onValueChange}
                            
                        />
                    </div>
                    
                    <Link onClick={Submit} to="/demograph-form" className="btn btn-success btn-lg  btn-block rounded-pill mt-5 ">Submit</Link>

                </Form>
                <ToastContainer/>
            </div>
        </>
    );
}
export default Acceptance;