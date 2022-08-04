import React, { useState } from "react";
import AddForm from "./AddForm";
import MapSelection from "../Map/MapSelection";
import AddCSV from "./AddCSV";



export default function AddPart(props){
    const {part, setPart, locationList} = props

    //state and function that determines if we are adding via csv, else add via form (default)
    const [addMode, setAddMode] = useState('none')
    const addModeButtonHandler = (e) => {
        setAddMode(e.target.value)
    }

    const [errorList, setErrorList] = React.useState([])
    let errors = errorList.map((er, k)=>(
        <p key={k} style={{color: 'red'}}>{er.errno} {er.code}: {er.message}</p>
    ))

    const clearErrorList = () => {
        setErrorList([])
    }

    return(
        <div>
            
            <h1>Add Part Via...</h1>

            <button className="btn" value='form' onClick={addModeButtonHandler}>FORM</button>
            <button className="btn" value='map' onClick={addModeButtonHandler}>MAP</button>
            <button className="btn" value='csv' onClick={addModeButtonHandler}>CSV</button>

            <hr/>

            {errorList[0] !== undefined && errorList[0] !== 'success' && <div>
                    
                    <div className='d-flex justify-content-evenly align-items-center col-2 offset-5'>
                        <div className="p-2 float-left">
                            <button className='btn btn-sm btn-secondary' onClick={clearErrorList}>OK</button>
                        </div>

                        <h3 style={{color: 'red'}}>Errors: </h3>
                    </div>
                    {errors}
            </div>}
            {errorList[0] === 'success' && <div>
                    <h4 style={{color: 'green'}}>Success!</h4>
                    <button className='btn btn-secondary' onClick={clearErrorList}>OK</button>
            </div>}

            {(addMode === 'form' || addMode === 'hide map') && 
                <AddForm 
                    part={part}
                    setPart={setPart}
                    locationList={locationList}
                    setErrorList={setErrorList}
                    clearErrorList={clearErrorList}
                />
            }
            {addMode === 'map' && 
                    <div>
                        <div>
                            <h1>Add Part Via Map</h1>
                        </div>
                        <MapSelection 
                            setPart={setPart}
                            setMapDisplay={setAddMode}
                        />      
                    </div>
                    
            }
            {addMode === 'csv' && 
                <AddCSV
                    errorList={errorList}
                    setErrorList={setErrorList}
                    clearErrorList={clearErrorList}
                />
            }
        </div>
    )
}