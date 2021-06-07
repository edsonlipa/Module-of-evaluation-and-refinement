import {useState } from "react";
import {Form, Row, Col} from 'react-bootstrap'

const RateType = (props) => {
  const [select,setSelect]=useState();
    
    const onValueChange=(event) =>{
    event.persist();
    setSelect(event.target.value);
    props.send_data({...props.menssage,[props.id]:event.target.value})
  }
  

  return (<div className='mb-3'>
            <Form >
              <fieldset>
                      
                <Form.Group as={Row} >
                  <Form.Label as="legend" column sm={4}>
                  Select the type of persuasion you think this message belongs to.
                  </Form.Label>
                  <Col sm={8}>
                    
                    <Form.Check
                      type="radio"
                      label="Commitment"
                      name="formHorizontalRadios"
                      value="Commitment"
                      checked={select==='Commitment'}
                      onChange={onValueChange}
                      id="formHorizontalRadios1"

                    />
                    <Form.Check
                      type="radio"
                      label="Liking"
                      name="formHorizontalRadios"
                      value="Liking"
                      checked={select==='Liking'}
                      onChange={onValueChange}
                      id="formHorizontalRadios"
                    />
                    <Form.Check
                      type="radio"
                      label="Consistency"
                      name="formHorizontalRadios"
                      value="Consistency"
                      checked={select==='Consistency'}
                      onChange={onValueChange}
                      id="formHorizontalRadios3"
                    />
                    <Form.Check
                      type="radio"
                      label="Contains no persuasion"
                      name="formHorizontalRadios"
                      value="Contains no persuasion"
                      checked={select==="Contains no persuasion"}
                      onChange={onValueChange}
                      id="formHorizontalRadios3"
                    />
                    <Form.Check
                      type="radio"
                      label="I'm not sure"
                      name="formHorizontalRadios"
                      value="I'm not sure"
                      checked={select==="I'm not sure"}
                      onChange={onValueChange}
                      id="formHorizontalRadios3"
                    />
                  </Col>
                </Form.Group>
                </fieldset>
              </Form>
          </div>
  );
};

export default RateType;
