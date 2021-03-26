//import {DateTimePicker} from '@mate'
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from 'react-toastify';

import { db } from "../apis/firebase";
import MessageForm from "./MessageForm";
//import Mytable from "./mytable";


const columnas = [
    {
        name: 'ORDER',
        selector: 'order',
        sortable:true,
        width:"50px",
        center:true
        
    },
    {
        name: 'MESSAGE',
        selector: 'message',
        sortable:true,
        grow:5,
        wrap:true
    },
    {
        name: 'novelty',
        selector: 'novelty',
        sortable:true,
        wrap:true
    },
    {
        name: 'diversity',
        selector: 'diversity',
        sortable:true,
        wrap:true
    }
]

const Messages =() =>{
    const initialstate={
        message:"",
        order:"",
        id:"",
        editable:false
    };
    const [messages, setmessages] = useState([]);
    const [msgselected, setmsgselected] = useState(initialstate);
    const [Mtype,setMtype]=useState({type:"Commitment"});
    const [msgsSetSelected,setmsgsSetSelected]=useState([]);
    const [toggledClearRows,settoggledClearRows] =useState(false);

    const writeselected=()=>{

        setmsgselected(initialstate);

    }
    const getData = async () =>{

        db.collection(Mtype.type).onSnapshot((query)=>{
            const msgs = [];
            query.forEach(element => {
                
                msgs.push({...element.data(),id:element.id});
                //console.log({...element.data(),id:element.id});
            });    
            setmessages(msgs);
        });
        settoggledClearRows(false)
        setmsgsSetSelected([]);

    }
    const handlechange= (e)=>{
        setMtype({...Mtype,type:e.target.value});  
        settoggledClearRows(true)
        setmsgsSetSelected([]);
    }

    const deleteset = async ()=>{
        var mensaje="estas seguro que quieres eliminar estos "+ msgsSetSelected.length+" elementos??";
        if(msgsSetSelected.length!==0 && window.confirm(mensaje)){
            
            msgsSetSelected.forEach(element =>{
                db.collection(Mtype.type).doc(element.id).delete().then(function () {
                        toast("Eliminado",{type: "error",});
                    }).catch(function (error) {
                        console.error({error})
                    });               
            });
            setmsgsSetSelected([]);
            settoggledClearRows(true)
        }
        /**/
        
    }

    const click=(rowdata)=>{
            //console.log(rowdata);
            setmsgselected({...rowdata,editable:false})
            console.log(msgselected);
    }
    const selectedRows=(rows)=>{
            console.log(rows.selectedRows);
            setmsgsSetSelected(rows.selectedRows)
    }
    
    useEffect(()=>{

        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Mtype,toggledClearRows]);
    

    return (
        <>
        <MessageForm
            {...{setmsgselected,writeselected,msgselected,Mtype}}
            />
        <div className="card card-body mt-2">
            
            <div className="form-group">
                <label >Tipo de Persuacion: </label>
                <select className="form-control col-lg-4 col-m-4 col-s-4"   onChange={handlechange} defaultValue={Mtype.type}>
                <option value='Commitment' >Commitment</option>
                <option value='Consistency'>Consistency</option>
                <option value='Liking'>Liking</option>
                </select>
            </div>

            <div className="card card-body">
                
                {
                    
                    msgsSetSelected.length!==0
                    ?<div className="btn btn-danger" onClick={deleteset}>Eliminar en grupo</div>
                    :null
                }
                <DataTable 
                data={messages}
                columns ={columnas}
                title="Mensajes"
                selectableRows
                onSelectedRowsChange={selectedRows}
                Clicked
                pagination
                clearSelectedRows={toggledClearRows}
                onRowClicked={click}
                defaultSortField="order"/>
                
                
            </div>
        
        </div>
        </>
    )
}

export default Messages;