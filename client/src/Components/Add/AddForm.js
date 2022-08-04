import React, { useEffect, useState } from "react";
import Axios from 'axios';


export default function AddForm(props){
    const {part, setPart, locationList, setErrorList, clearErrorList} = props

    //DB interaction function
    const addPart = () => {
        
        //formats the custom attributes to be added to MySQL db as a JSON object
        let custAttrs = '{'+
            Object.keys(customAttributes).map((key)=>(
                '"'+key+'": "'+customAttributes[key]+'"'
            ))+'}'
    
            Axios.post('http://localhost:3001/addPart', 
            {
              barcode: part.barcode, 
              name: part.name, 
              locationID: part.locationID, 
              project: part.project, 
              manufacturer: part.manufacturer, 
              model: part.model, 
              serialNum: part.serialNum, 
              notes: part.notes,
              onLoan: part.onLoan,
              customAttributes: custAttrs
            }
            ).then((response)=>{
              
              if(response.data.sqlMessage !== undefined){
                setErrorList((prev)=>[...prev, {errno: response.data.errno, code: response.data.code, message: response.data.sqlMessage}]);
              }
              else{
                setErrorList(['success'])

                //resets the part & custom attributes
                setPart({barcode:"", name: '', locationID:'', project:'', manufacturer:'', model:'', serialNum:'', notes:'', onLoan: 0, customAttributes:''})
                setCustomAttributes({})
              }
        
            })
      }

    //END DB interaction function

    //sets appropriate attribute of part
    const partSetter = (event) => {
        setPart(prev => {return{...prev, [event.target.name]:event.target.value}})
    }

    //customAttributes state
    const [customAttributes, setCustomAttributes] = useState({})

    let customAttributesDisplay =
    Object.keys(customAttributes).map((k,key)=>(
        <p key={key}>{k}: {customAttributes[k]}</p>
    ))

    const addCustomAttribute = () =>{
        setCustomAttributes((prev)=>{return{...prev, [document.getElementById('key').value]: document.getElementById('value').value}}) 
    }

    const clearCustomAttributes = () => {
        setCustomAttributes({})
    }

    //anytime customAttributes updates we clear the key value input boxes
    useEffect(()=>{
        document.getElementById('key').value = ''
        document.getElementById('value').value = ''
    },[customAttributes])

    const addPartClick = () => {
        clearErrorList()
        clearCustomAttributes()

        addPart()
    }

    return(
        <div className="col-10 offset-1">

            <div>
              <h1>Add Part Via Form</h1>
            </div>
        
                <div className="row">
                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "barcode" value={part.barcode} type="text" placeholder="barcode" onChange={(e)=>(partSetter(e))}/>
                        <label>BARCODE</label>
                    </div>

                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "name" value={part.name} type="text" placeholder="name" onChange={(e)=>partSetter(e)}/>
                        <label>NAME <span style={{color: 'red'}}>*</span></label>
                    </div>

                    <div className="col form-floating mb-3">
                        <input className="form-control" list="datalistOptions" name="locationID" value={part.locationID} type='text' placeholder="Location ID" onChange={(e)=>partSetter(e)}/>
                        <datalist id="datalistOptions">
                            {locationList.map((i) => {return(<option value={i.locationID} key={i.locationID}>{i.locationID}</option>)})}
                        </datalist>
                        <label className="form-label">LOCATION ID <span style={{color: 'red'}}>*</span></label>
                    </div>
                </div>

                <div className="row">
                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "project" value={part.project} type="text" placeholder="project" onChange={(e)=>partSetter(e)}/>
                        <label className='addPartLabel'>PROJECT</label>
                    </div>

                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "manufacturer" value={part.manufacturer} type="text" placeholder="manufacturer" onChange={(e)=>partSetter(e)}/>
                        <label className='addPartLabel'>MANUFACTURER</label>
                    </div>

                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "model" value={part.model} type="text" placeholder="model" onChange={(e)=>partSetter(e)}/>
                        <label className='addPartLabel'>MODEL</label>
                    </div>
                </div>

                <div className="row">
                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "serialNum" value={part.serialNum} type="text" placeholder="serial number" onChange={(e)=>partSetter(e)}/>
                        <label className='addPartLabel'>SERIAL NUMBER</label>
                    </div>

                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "notes" value={part.notes} type="text" placeholder="notes" onChange={(e)=>partSetter(e)}/>
                        <label className='addPartLabel'>NOTES</label>
                    </div>

                    <div className="col mb-3">
                        <label>ON LOAN?</label>
                        <div className="d-flex justify-content-evenly">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" value={1} name="onLoan" onChange={(e)=>partSetter(e)}/>
                                <label>YES</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" value={0} name="onLoan" defaultChecked onChange={(e)=>partSetter(e)}/>
                                <label>NO</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col form-floating mb-3'>
                        <input className='form-control' id= "key" type="text" placeholder="custom attr"/>
                        <label className='addPartLabel'>CUSTOM ATTR KEY</label>
                    </div>

                    <div className='col form-floating mb-3'>
                        <input className='form-control' id= "value" type="text" placeholder="custom attr"/>
                        <label className='addPartLabel'>CUSTOM ATTR VALUE</label>
                    </div>

                    <div className="col d-flex justify-content-evenly align-items-center py-1">
                        <button className="btn btn-sm btn-success mx-1" onClick={addCustomAttribute}>ADD ATTR</button>
                        <button className="btn btn-sm btn-danger mx-1" onClick={clearCustomAttributes}>CLEAR ATTRS</button>
                    </div>

                </div>

                {customAttributesDisplay[0] !== undefined && <div className="row">
                    <h5>Custom Attributes for current part:</h5>
                    {customAttributesDisplay}
                </div>}

                <div className="row mb-3">
                    <div className="col">
                        <button className="btn btn-lg btn-success p-3" onClick={addPartClick}>ADD PART</button>
                    </div>
                </div>

            </div>
    )
}