import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../apis/firebase'
import Loading from '../components/Loading';
import NavBar from '../components/navBar';
import {Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const FeedBack =()=>{
    const [user, loading] = useAuthState(auth);
    if(!user&&loading){
        return <Loading/>
    }

    return(
        <><NavBar />
            <div className="container mt-4 pb-5">
                <h3 className="mt-4 d-flex justify-content-center">Thanks for your contribution!</h3>
                <h4 className="mb-4 mt-4">Feedback</h4>
                <Form className="m-4">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='h5'>a. Please let me know if you have any suggestions or comments.</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    

                        <Link to="/ratingpage" className="btn btn-success btn-lg  btn-block rounded-pill mt-5">Submit</Link>

                </Form>
                
            </div>
        </>
    );
}
export default FeedBack;