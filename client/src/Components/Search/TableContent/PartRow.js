import React from 'react';
import TableData from './TableData';
import searchIcon from '../../../Images/searchIcon.png'



export default function PartRow(props){
    const {partList, updateParts, onFind, showLoan, updateMultipleParts, checkedState, checkboxHandler, query} = props
    
    
    
    return(
        partList.map((item, index)=>{
            
            return(
            <tr key={item.partID}>
                <td>
                    <input type='checkbox' id='selector' name='selector' value={item.partID} checked={checkedState[index]} onChange={(e)=>{checkboxHandler(index, e.target.checked, e.target.value)}}/>
                </td>

                <TableData
                    item = {item.barcode}
                    id = {item.partID}
                    field = "barcode"
                    updateParts = {updateParts}
                    updateMultipleParts={updateMultipleParts}
                />

                <TableData
                    item = {item.name}
                    id = {item.partID}
                    field = "name"
                    updateParts = {updateParts}
                    query={query}
                    updateMultipleParts={updateMultipleParts}
                />

                <TableData
                    item = {item.locationID}
                    id = {item.partID}
                    field = "locationID"
                    updateParts = {updateParts}
                    updateMultipleParts={updateMultipleParts}
                />

                <td>
                    <img 
                        src={searchIcon} 
                        alt='SHOW' 
                        style={{width: '20px', cursor: 'pointer'}}
                        onClick={()=>{onFind(item)}}
                    />
                </td>

                <TableData
                    item = {item.project}
                    id = {item.partID}
                    field = "project"
                    updateParts = {updateParts}
                    updateMultipleParts={updateMultipleParts}
                />

                <TableData
                    item = {item.manufacturer}
                    id = {item.partID}
                    field = "manufacturer"
                    updateParts = {updateParts}
                    updateMultipleParts={updateMultipleParts}
                />

                <TableData
                    item = {item.model}
                    id = {item.partID}
                    field = "model"
                    updateParts = {updateParts}
                    updateMultipleParts={updateMultipleParts}
                />

                <TableData
                    item = {item.serialNum}
                    id = {item.partID}
                    field = "serialNum"
                    updateParts = {updateParts}
                    updateMultipleParts={updateMultipleParts}
                />

                <TableData
                    item = {item.notes}
                    id = {item.partID}
                    field = "notes"
                    updateParts = {updateParts}
                    updateMultipleParts={updateMultipleParts}
                />

                <TableData
                    item = {item.customAttributes}
                    id = {item.partID}
                    field = "customAttributes"
                    updateParts = {updateParts}
                    updateMultipleParts={updateMultipleParts}
                />

                {showLoan && 
                <TableData
                    item = {item.onLoan}
                    id = {item.partID}
                    field = "onLoan"
                    updateParts = {updateParts}
                    updateMultipleParts={updateMultipleParts}
                />}


            </tr>
        )})
    )
}