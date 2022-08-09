import React, { useState, useRef } from "react";
import editIcon from '../../../Images/editIcon.png'
import xicon from '../../../Images/xicon.png'

export default function TableData(props){
    const {item, field, id, updateParts, query, updateMultipleParts} = props

    const [editCell, setEditCell] = useState('editCell1')//determines what stage of editing cells the user is at.

    const newValue = useRef('')//the new cell value to be pushed to the database
    
    //highlight text-----------https://thewebdev.info/2021/11/13/how-to-highlight-text-using-react/#:~:text=To%20highlight%20text%20using%20React%2C%20we%20can%20create%20our%20own,what%20we%20want%20to%20highlight.&text=to%20create%20the%20Highlighted%20component,set%20as%20the%20highlight%20option.
    let highlightedItem = item
    if(field === 'name' && query !== ''){
        const regex = new RegExp(`(${query})`, "gi");
        
        //splits item based on the string matching regex (query)
        const parts = highlightedItem.split(regex)

        highlightedItem = (<span>
                {parts.filter(String).map((part,key) => {//key is auto incrementing number
                    return regex.test(part) ? (<mark style={{background: '#E1AD01'}}key={key}>{part}</mark>) : (<span key={key}>{part}</span>);//if segment of parts contains regex we highlight, else we leave it be
                })}
            </span>)
    }

    //display custom attributes-----------------------------------------------------------------------
    const customAttributesDisplay = useRef('')
    if(field === 'customAttributes' && item !== null && item !== '{}'){
        let modItem = JSON.parse(item)//takes JSON object and makes a js object out of it

        customAttributesDisplay.current =
            Object.keys(modItem).map((key,k)=>(//k is an auto incrementing key 
                <div key={k}>
                    <h3>{key}:</h3>
                    <p> {modItem[key]}</p>
                </div>
            ))
    }

    //handles hovering over cells to display edit icon
    const cellHoverOn = () => {
        if (editCell === 'editCell1'){
            setEditCell('editCell2')
        }
    }
    const cellHoverOff = () => {
        if(editCell === 'editCell2'){
            setEditCell('editCell1')
        }
    }

    //handles update button click
    const updateButtonClick = () => {
        updateParts(field, newValue.current, id);//updates the current cell whether it is checked or not
        updateMultipleParts(field, newValue.current); //updates any checked cells
        setEditCell('editCell1');//sets editCell state to first stage
    }
    
    return(
                <td className='tableData' onMouseEnter={cellHoverOn} onMouseLeave={cellHoverOff}>
                    <div>
                        {editCell !== 'editCell3' && field !== 'name' && field !== 'onLoan' && (field !== 'customAttributes' || item === null || item === undefined || item === '{}') &&
                            <p>{(item === ''|| item === null || item === undefined || item === '{}')?'-':item}</p>//displays "-" when no attribute, or displays the item
                        }

                        {editCell !== 'editCell3' && field === 'name' && 
                            <p>{highlightedItem}</p>//to display highlighted item
                        }

                        {editCell !== 'editCell3' && (field === 'customAttributes' && item !== null && item !== undefined && item !== '{}') && 
                            <div>{customAttributesDisplay.current}</div>//displays the custom attributes
                        }

                        {editCell !== 'editCell3' && field === 'onLoan' && 
                            <p>{item===0?'NO':'YES'}</p>//displays whether or not the part is onloan
                        }

                        {editCell === 'editCell2' && 
                            <img 
                                style={{width: '20px', cursor: 'pointer'}} 
                                src={editIcon} 
                                alt="EDIT" 
                                onClick={() => {setEditCell('editCell3');}}
                            />//displays editCell stage 2 edit icon 
                        }
                        
                        {editCell === 'editCell3' &&
                            <div className="tableData"> 
                                {field !== 'notes' && field !== 'customAttributes' && <input type="text"
                                    defaultValue={item}
                                    onClick={(e) => {newValue.current = e.target.value}}
                                    onChange={(e) => {newValue.current = e.target.value}}
                                >
                                </input>//edit item box
                                }
                                {(field === 'notes' || field === 'customAttributes') && <textarea 
                                    defaultValue={item}
                                    onClick={(e) => {newValue.current = e.target.value}}
                                    onChange={(e) => {newValue.current = e.target.value}}
                                >
                                </textarea>//displays a larger box for notes & custom attributes
                                }
                                <div style={{display: 'flex', justifyContent: 'center', gap: '10px', padding:'10px'}}>
                                    <button className="btn btn-sm btn-secondary" style={{gridArea: '1/2'}} onClick={updateButtonClick}>update</button>
                                    <img src={xicon} alt="X" style={{cursor: 'pointer', width: '25px'}} onClick={() => {setEditCell('editCell1');}}/>
                                </div>
                            </div>
                        }
                    </div>
                </td>       
    )
}
