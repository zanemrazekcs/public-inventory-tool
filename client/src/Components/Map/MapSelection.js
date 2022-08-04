import React, { useState } from "react";
import Box from "./Box";
import rooms from "./Room & Box Arrays/rooms";
import roomAbs from "./Room & Box Arrays/roomAbs";
import roomAbsNoMid from "./Room & Box Arrays/roomAbsNoMid";

import left1 from "./Room & Box Arrays/room1/left1";
import back1 from "./Room & Box Arrays/room1/back1";
import front1 from "./Room & Box Arrays/room1/front1";
import right1 from "./Room & Box Arrays/room1/right1";
import middle1 from "./Room & Box Arrays/room1/middle1";

import left2 from "./Room & Box Arrays/room2/left2";
import back2 from "./Room & Box Arrays/room2/back2";
import front2 from "./Room & Box Arrays/room2/front2";
import right2 from "./Room & Box Arrays/room2/right2";

import left3 from "./Room & Box Arrays/room3/left3";
import back3 from "./Room & Box Arrays/room3/back3";
import front3 from "./Room & Box Arrays/room3/front3";
import right3 from "./Room & Box Arrays/room3/right3";

export default function MapSelection(props){
    const {setPart, setMapDisplay} = props

    const [map, setMap] = useState(rooms)

    const [roomView, setRoomView] = useState('top')

    const [room, setRoom] = useState('')

    let roomElements = map.map((box)=>(
        <Box 
            key={box.arrName}//unique identifier for each box element
            on={box.on}//whether the box is currently green or not
            text={box.text}//descriptive text on each box in the map
            gridArea={box.gridArea}//determines where on the map each box appears
            toggle={() => toggleBoxGreen(box.id)}//when a box is clicked this function makes it green or not green
            
            //can be implemented later if desired
            //height={box.height}
            //width={box.width}
        />
    ))

    const toggleBoxGreen = (id) => {
        setMap(prevMap => {
            return prevMap.map((box)=> {
                return box.id === id ? {...box, on: !box.on} : {...box, on: false}
            })
        })
    }

    const roomSetter = () => {

        //call roomSetter functions depending on value of room
        if(room === 'locID'){
            locationIDSetter()
        }
        else if(room === 'room1'){
            room1Setter()
        }
        else if(room === 'room2'){
            room2Setter()
        }
        else if(room === 'room3'){
            room3Setter()
        }
        else{//if value of room is not set it implies we are at the first map
            map.forEach(box => {
                if(box.on){
                    if(box.arrName === 'room1'){
                        setRoom('room1')//sets room so on next call of roomSetter, room1Setter is called
                        setMap(roomAbs)//sets next display to where users choose a wall in the room
                    }
                    else if(box.arrName === 'room2'){
                        setRoom('room2')//sets room so on next call of roomSetter, room2Setter is called
                        setMap(roomAbsNoMid)//sets next display to where users choose a wall in the room
                    }
                    else if(box.arrName === 'room3'){
                        setRoom('room3')//sets room so on next call of roomSetter, room3Setter is called
                        setMap(roomAbsNoMid)//sets next display to where users choose a wall in the room
                    }
                }
            });
        }
        
        //after the map is changed, roomElements is set to match the new map configuration to be displayed
        roomElements = map.map((box)=>(
            <Box 
                key={box.arrName}//unique identifier for each box element
                on={box.on}//whether the box is currently green or not
                text={box.text}//descriptive text on each box in the map
                gridArea={box.gridArea}//determines where on the map each box appears
                toggle={() => toggleBoxGreen(box.id)}//when a box is clicked this function makes it green or not green

                //can be implemented later if desired
                //height={box.height}
                //width={box.width}
            />
        ))
        
    }

    const room1Setter = () => {
        setRoomView('side')//change the perspective to a side view

        map.forEach(box => {
            if(box.on){
                //reads the arrName value of the box that is on and sets map appropriately
                if(box.arrName === 'left'){
                    setMap(left1)
                }
                else if(box.arrName === 'right'){
                    setMap(right1)
                }
                else if(box.arrName === 'front'){
                    setMap(front1)
                }
                else if(box.arrName === 'back'){
                    setMap(back1)
                }
                else if(box.arrName === 'middle'){
                    setMap(middle1)
                    setRoomView('top')//the middle of the room is from a top view unlike the other walls
                }
            }
        })
        //sets the room state to locID - meaning a box clicked on a map of a room wall will be handled as a locationID
        setRoom('locID')
    }
    const room2Setter = () => {
        setRoomView('side')

        map.forEach(box => {
            if(box.on){
                if(box.arrName === 'left'){
                    setMap(left2)
                }
                else if(box.arrName === 'right'){
                    setMap(right2)
                }
                else if(box.arrName === 'front'){
                    setMap(front2)
                }
                else if(box.arrName === 'back'){
                    setMap(back2)
                }
            }
        })
        setRoom('locID')
    }
    const room3Setter = () => {
        setRoomView('side')

        map.forEach(box => {
            if(box.on){
                if(box.arrName === 'left'){
                    setMap(left3)
                }
                else if(box.arrName === 'right'){
                    setMap(right3)
                }
                else if(box.arrName === 'front'){
                    setMap(front3)
                }
                else if(box.arrName === 'back'){
                    setMap(back3)
                }
            }
        })
        setRoom('locID')
    }

    const locationIDSetter = () => {
        map.forEach(box => {
            //the selected box
            if(box.on){
                setPart(prev => {return{...prev, locationID:box.arrName}})//set locationID to the box's location

                //resets to default map, roomView, and room as well as hides the map displays
                setMap(rooms)
                setRoomView('top')
                setRoom('')
                setMapDisplay('hide map')
            }
        })
    }

    return(
        <div className="col-10 offset-1">
            {roomView === 'top' && <h3 style={{padding: '10px', margin: 'auto'}}>TOP VIEW</h3>}
            {roomView === 'side' && <h3 style={{padding: '10px', margin: 'auto'}}>SIDE VIEW</h3>}
                
                {room === '' && <p>Pick what room the part is stored in.</p>}
                {room.substring(0,4) === 'room' && <p>Pick what section of the room the part is stored in.</p>}
                {room === 'locID' && <p>Pick what unit the part is stored in.</p>}
            
                    <div className='roomView'>
                        {roomElements}
                    </div>

                <p>(Click the corresponding box then click confirm)</p>
            
                <button 
                    style={{margin: '10px', padding: '10px 15px 10px', borderRadius: '10px'}}
                    onClick={roomSetter}
                >CONFIRM</button>
            
            {roomView === 'top' && <h3 style={{padding: '10px', margin: 'auto'}}>TOP VIEW</h3>}
            {roomView === 'side' && <h3 style={{padding: '10px', margin: 'auto'}}>SIDE VIEW</h3>}
            <hr/>
        </div>
    )
}