import React from 'react';
import Axios from 'axios'
import PartRow from './PartRow';




export default function Table(props){

    const {getParts, partList, setPartList, showLoan, toggleMapResult, idList, checkedState, checkboxHandler, query} = props

    //DB functions--------------------------------------------------------------------    
    const updateParts = (updateField, newVal,id) => {//713 optimized so we no longer use state
        Axios.put('http://localhost:3001/updateParts', {
            field: updateField,
            fieldVal: newVal,
            id: id,
        }).then((response)=>{
        
            setPartList(partList.map((val)=>{
                return (val.barcode === id ? 
                    {barcode: val.barcode, 
                    name: val.name, 
                    locationID: val.locationID, 
                    project: val.project, 
                    manufacturer: val.manufacturer, 
                    model: val.model, 
                    serialNum: val.serialNum, 
                    notes: val.notes,
                    onLoan: val.onLoan,
                    customAttributes: val.customAttributes,
                    [updateField]: newVal,
                    }
                : val) 
            }))
        
            getParts()
        });
    }

    const updateMultipleParts = (updateField, newVal) => {
        for(let i = 0; i < idList.length; i++){
          updateParts(updateField,newVal,idList[i])
        }
    }
    //------------------
    

    const onFind = (item) => {
        toggleMapResult(item.locationID, item.locationID[1])
        setPartList([item,])
    }
    
  

    return(
        <div>
        
        <div>
            <table id="partTable" className='searchTable'>
                <tbody id ='partTableb'>
                    <tr id='pheader'>
                        <th>Selector</th>
                        <th>Barcode</th>
                        <th>Name</th>
                        <th>Location ID</th>
                        <th>Show on MAP</th>
                        <th>Project</th>
                        <th>Manufacturer</th>
                        <th>Model</th>
                        <th>Serial Number</th>
                        <th>Notes</th>
                        <th>Custom Attributes</th>
                        {showLoan && <th>On Loan</th>}
                    </tr>

                    <PartRow 
                        partList = {partList}
                        showLoan={showLoan}
                        onFind={onFind}
                        checkedState={checkedState}
                        checkboxHandler={checkboxHandler}
                        updateParts = {updateParts}
                        updateMultipleParts={updateMultipleParts}
                        query={query}
                    />

                </tbody>
            </table>
            
            

        </div>

        </div>

    )
}