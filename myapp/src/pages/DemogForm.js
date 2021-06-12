import React, { useState } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../apis/firebase'
import Loading from '../components/Loading';
import NavBar from '../components/navBar';
import {Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { db } from "../apis/firebase";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const DemogForm =()=>{
    const [user, loading] = useAuthState(auth);
    const data = {
        ageGroup:"",
        genderGroup:"",
        writtenGroup:"",
        spokenGroup:"",
        };
    const [form, setForm] = useState(data);

    const onValueChange=(event) =>{
        event.persist();
        setForm({...form,[event.target.name]:event.target.value});
    }
    const Submit=async(event)=>{
        
        if(form.ageGroup!="" &&
        form.genderGroup!="" &&
        form.writtenGroup!=""&&
        form.spokenGroup!="")
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
                <h4 className="mb-4 mt-4">Demographic Questionnaire</h4>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>a. What is your age group?</Form.Label>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="18 - 25"
                            name="ageGroup"
                            value="18 - 25"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="26 - 35"
                            name="ageGroup"
                            value="26 - 35"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="36 - 45"
                            name="ageGroup"
                            value="36 - 45"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="46 - 55"
                            name="ageGroup"
                            value="46 - 55"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="60 or more"
                            name="ageGroup"
                            value="60 or more"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                        <Form.Label>b. What is your gender?</Form.Label>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Female"
                            name="genderGroup"
                            value="Female"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Male"
                            name="genderGroup"
                            value="Male"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Prefer not to say"
                            name="genderGroup"
                            value="Prefer not to say"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Other"
                            name="genderGroup"
                            value="Other"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                        <Form.Label>c. What is your written English level?</Form.Label>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Beginner"
                            name="writtenGroup"
                            value="Beginner"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Elementary English"
                            name="writtenGroup"
                            value="Elementary English"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Intermediate English"
                            name="writtenGroup"
                            value="Intermediate English"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Upper-Intermediate"
                            name="writtenGroup"
                            value="Upper-Intermediate"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Advanced English"
                            name="writtenGroup"
                            value="Advanced English"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Proficiency"
                            name="writtenGroup"
                            value="Proficiency"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                        <Form.Label>c. What is your spoken English level?</Form.Label>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Beginner"
                            name="spokenGroup"
                            value="Beginner"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Elementary English"
                            name="spokenGroup"
                            value="Elementary English"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Intermediate English"
                            name="spokenGroup"
                            value="Intermediate English"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Upper-Intermediate"
                            name="spokenGroup"
                            value="Upper-Intermediate"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Advanced English"
                            name="spokenGroup"
                            value="Advanced English"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>
                        <Form.Check 
                            className='m-3'
                            type="radio"
                            label="Proficiency"
                            name="spokenGroup"
                            value="Proficiency"
                            //checked={select==='Commitment'}
                            onChange={onValueChange}
                            id="formHorizontalRadios1"/>        
                    </Form.Group>
                    
                        <Link onClick={Submit} to="/ratingpage" className="btn btn-success btn-lg  btn-block rounded-pill mt-5 ">Submit</Link>

                </Form>
                <ToastContainer/>
            </div>
        </>
    );
}
export default DemogForm;