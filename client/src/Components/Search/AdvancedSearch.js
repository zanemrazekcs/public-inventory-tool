import React from "react";

export default function AdvancedSearch(props){
    const {part, setPart, locationList} = props

    //sets appropriate attribute of part
    const partSetter = (event) => {
        setPart(prev => {return{...prev, [event.target.name]:event.target.value}})
    }

    return(
        <div>
            <h5>Advanced Search</h5>

            <div className="col-8 offset-2">
                <div className="row">
                    <div className='col form-floating mb-3'>
                        <input className='form-control' name="barcode" value={part.barcode} type="text" placeholder="barcode" onChange={(e)=>(partSetter(e))}/>
                        <label>BARCODE</label>
                    </div>

                    <div className='col form-floating mb-3'>
                        <input className='form-control' name="name" value={part.name} type="text" placeholder="name" onChange={(e)=>(partSetter(e))}/>
                        <label>NAME</label>
                    </div>


                    <div className="col form-floating mb-3">
                        <input className="form-control" list="datalistOptions" name='locationID' value={part.locationID} type='text' placeholder="Location ID" onChange={(e)=>(partSetter(e))}/>
                        <datalist id="datalistOptions">
                            {locationList.map((i) => {return(<option value={i.locationID} key={i.locationID}>{i.locationID}</option>)})}
                        </datalist>
                        <label className="form-label">LOCATION ID</label>
                    </div>

                </div>

                
                
                <div className="row">
                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "project" value={part.project} type="text" placeholder="project" onChange={(e)=>(partSetter(e))}/>
                        <label className='addPartLabel'>PROJECT</label>
                    </div>

                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "manufacturer" value={part.manufacturer} type="text" placeholder="manufacturer" onChange={(e)=>(partSetter(e))}/>
                        <label className='addPartLabel'>MANUFACTURER</label>
                    </div>

                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "model" value={part.model} type="text" placeholder="model" onChange={(e)=>(partSetter(e))}/>
                        <label className='addPartLabel'>MODEL</label>
                    </div>
                </div>

                <div className="row">
                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "serialNum" value={part.serialNum} type="text" placeholder="serial number" onChange={(e)=>(partSetter(e))}/>
                        <label className='addPartLabel'>SERIAL NUMBER</label>
                    </div>

                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "notes" value={part.notes} type="text" placeholder="notes" onChange={(e)=>(partSetter(e))}/>
                        <label className='addPartLabel'>NOTES</label>
                    </div>

                    <div className='col form-floating mb-3'>
                        <input className='form-control' name= "customAttributes" value={part.customAttributes} type="text" placeholder="custom attr" onChange={(e)=>(partSetter(e))}/>
                        <label className='addPartLabel'>CUSTOM ATTR</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="btn btn-danger" 
                            onClick={()=>{setPart({barcode:"", name: '', locationID:'', project:'', manufacturer:'', model:'', serialNum:'', notes:'', onLoan: 0, customAttributes:''})}}
                        >CLEAR</button>
                    </div>
                </div>

            </div>
        </div>
    )
}


 