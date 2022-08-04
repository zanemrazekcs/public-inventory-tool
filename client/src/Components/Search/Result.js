import React, { useState, useRef } from "react";
import Box from '../Map/Box';
import room1 from '../Map/Room & Box Arrays/room1';
import room2 from '../Map/Room & Box Arrays/room2';
import room3 from '../Map/Room & Box Arrays/room3';
import Table from "./TableContent/Table";
import Pagination from './Pagination';

export default function Result(props){
    const {getParts, partList, setPartList, showLoan, idList, checkedState, checkboxHandler, query} = props

    //pagination-----------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1)//the current page of results
    const [recordsPerPage, setRecordsPerPage] = useState(50)//holds the number of posts per page that will be allowed
    const totalRecords = useRef(0)
    

    const getCurrentPageResults = (partList) => {
        totalRecords.current = partList.length;

        const indexOfLastRecord = currentPage * recordsPerPage//finds the index in partList of first record to show in table
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage//finds the index in partList of last record to show in table

        //slices partList to only show desired page of results from partList
        const currentRecords = partList.slice(indexOfFirstRecord, indexOfLastRecord)

        return currentRecords//returns values of partList to display in table
    }
    

    //displaying map----------------------------------------------------------
    const [showOnMap, setShowOnMap] = useState(false)//determines whether or not the results map is displayed
    const [map, setMap] = useState([])//contains the array of objects that makes up a map
    const [currentID, setCurrentID] = useState()//stores the ID of whatever part is being displayed on the map
    

    let roomElements = map.map((box)=>(
        <Box 
            key={box.id+box.id2}
            on={box.on}
            text={box.text}
            gridArea={box.gridArea}
            height={box.height}
            width={box.width}//do we even use?
        />
    ))

    const toggleMapResult = (id, room) => {
        
        //currentID is set with the locationID value to be used for roomDesc
        setCurrentID(id)

        //determines which top view room map array should be stored in the map state
        if(room === '1'){
            setMap(room1)
        }
        else if(room === '2'){
            setMap(room2)
        }
        else if(room === '3'){
            setMap(room3)
        }

        //checks for a match with any locationID that corresponds with the current box in the top view map to set the proper one green
        setMap(prevMap => {
            return prevMap.map((box)=> {
                return (box.id === id || box.id2 === id || box.id3 === id || box.id4 === id) ? {...box, on: !box.on} : {...box, on: false}
            })
        })

        //roomElements is set to match the new map configuration to be displayed
        roomElements = map.map((box)=>(
            <Box 
                key={box.id+box.id2}
                on={box.on}
                text={box.text}
                gridArea={box.gridArea}
            />
        ))

        setShowOnMap(true)
    }

    const roomDesc = () => {
        var description = `Part located in room ${currentID.charAt(1)}`

        //front/back/middle
        if(currentID.charAt(3) === 'F'){
            description+= ', towards the front'
        }
        else if(currentID.charAt(3) === 'B'){
            description+= ', towards the back'
        }
        else{
            description+= ', towards the back'
        }

        //left/right/middle
        if(currentID.charAt(4) === 'L'){
            description+= ', on the left-hand side'
        }
        else if(currentID.charAt(4) === 'R'){
            description+= ', on the right-hand side'
        }
        else{
            description+= ', in the center of the room'
        }

        //upper/lower/middle
        if(currentID.charAt(5) === 'U'){
            description+= ', in the upper portion of the room. '
        }
        else if(currentID.charAt(5) === 'L'){
            description+= ', in the lower portion of the room. '
        }
        else{
            description+= ', at about counter level. '
        }

        //unit
        if(currentID.substring(7,10) === 'FLR'){
            description+= 'On the floor.'
        }
        else if(currentID.substring(7,10) === 'CBN'){
            description+= `In cabinet #${currentID.charAt(10)}.`
        }
        else if(currentID.substring(7,10) === 'CRT'){
            description+= `On the cart.`
        }
        else if(currentID.substring(7,10) === 'DSK'){
            description+= `On desk #${currentID.charAt(10)}.`
        }
        else if(currentID.substring(7,10) === 'DRW'){
            description+= `In drawer #${currentID.charAt(10)}.`
        }
        else if(currentID.substring(7,10) === 'WND'){
            description+= `On the window.`
        }
        else if(currentID.substring(7,10) === 'SHL'){
            description+= `On shelf #${currentID.charAt(10)}.`
        }
        else if(currentID.substring(7,10) === 'CHM'){
            description+= `In chemical storage.`
        }
        else if(currentID.substring(7,10) === 'WKB'){
            description+= `On the workbench.`
        }
        else if(currentID.substring(7,10) === 'TLC'){
            description+= `In the tool chest.`
        }
        else if(currentID.substring(7,9) === 'BN'){
            description+= `In bin #${currentID.charAt(9)}.`
        }
        else if(currentID.substring(7,10) === 'CBR'){
            description+= `On the cable rack.`
        }

        return description
    }

    return (
        <div>
        
            <Table 
                getParts={getParts}
                partList={getCurrentPageResults(partList)}
                setPartList={setPartList}
                showLoan={showLoan}
                toggleMapResult={toggleMapResult}
                idList={idList}
                checkedState={checkedState}
                checkboxHandler={checkboxHandler}
                query={query}
            />

            <Pagination 
                setCurrentPage={setCurrentPage}
                recordsPerPage={recordsPerPage}
                setRecordsPerPage={setRecordsPerPage} 
                totalRecords={totalRecords.current} 
            />

            {showOnMap && <div>
                <button className='btn btn-secondary mb-3' onClick={()=>{setShowOnMap(false); getParts()}}>DONE</button>
                <h3 style={{padding: '10px', margin: 'auto'}}>TOP VIEW</h3>
                    <h4>{currentID}: {roomDesc()}</h4>
                        <div className='roomView'>    
                            {roomElements}
                        </div>
                <h3 style={{padding: '10px', margin: 'auto'}}>TOP VIEW</h3>
                <button className='btn btn-secondary mb-3' onClick={()=>{setShowOnMap(false); getParts()}}>DONE</button>
            </div>}
        </div>
    )
}