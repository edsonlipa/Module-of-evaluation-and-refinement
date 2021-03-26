import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../apis/firebase';


const MessageForm = (props) => {
    //const [edit,setedit]=useState(false);
    const [currentmsg, setcurrentmsg] = useState({
        message:"",
        order:"",
        id:"",
        editable:false
    });
    const [Mtype,setMtype]=useState({type:"Commitment"});

    const editMessage = async ()=>{
        await db.collection(Mtype.type).doc(currentmsg.id).update(currentmsg);
        toast("Actualizado",{
            type: "success",
        })
    }
    const deleteMessage = async (id)=>{
        if(currentmsg.message!=="" && window.confirm("¿seguro que quieres eliminar este mensaje?")){
            await db.collection(Mtype.type).doc(currentmsg.id).delete().then(function () {
                toast("Eliminado",{type: "error",});
              }).catch(function (error) {
                console.error({error})
              });
                
        }
        
    }
    const handlechange=e=>{

        setcurrentmsg({...currentmsg,[e.target.name]:e.target.value})
        console.log(currentmsg)
    }

    useEffect(()=>{
        
        console.log("props.msgselected");
        console.log(props.msgselected);
        setcurrentmsg(props.msgselected);
        setMtype(props.Mtype);

    },[props.msgselected,props.Mtype])

    const toggleeditable=()=>{
        props.setmsgselected({...currentmsg,editable:!currentmsg.editable})
    }
    const clickEdit=()=>{
        console.log("click edit "+!currentmsg.editable)
        if (currentmsg.editable) {
            console.log('saving')
            editMessage();
            props.writeselected()
            toggleeditable();            
        }else if(currentmsg.message!==""&&!currentmsg.editable){
            toggleeditable();
        }


    }

    return (
        <form className="card card-body ">
            <div className="form-group">
                <label >Mensaje Seleccionado</label>
                <textarea type="textarea" className="form-control" name="message" 
                rows="3"
                placeholder="message example"
                onChange={handlechange}
                value={currentmsg.message}
                readOnly={currentmsg.editable?false:true}
                />
                
            </div>
            
            <div className="form-group text-right">
                <div className="btn-group" >
                    <button type="button" 
                        className={currentmsg.editable?'btn btn-success':'btn btn-warning'}
                        onClick={clickEdit}>
                        {currentmsg.editable?'GUARDAR':'Editar'}
                    </button>
                    {
                       currentmsg.editable
                       ?<button type="button" className='btn btn-warning' onClick={toggleeditable}>Cancelar</button>
                       :null
                    }
                    <button className="btn btn-danger" type='button'
                        onClick={()=>deleteMessage(currentmsg.id)}>
                        Eliminar
                    </button>
                                             
                </div>

                
            
                
            </div>
            

        </form>
        )
};

export default MessageForm;