import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Fuse from 'fuse.js'
import trash from "../../Images/trash.png";
import AdvancedSearch from "./AdvancedSearch";
import MapSelection from "../Map/MapSelection";
import Result from "./Result";

export default function Searchbar(props){
    const {part, setPart, locationList} = props

    //list of parts that will be populated from db
    const [partList, setPartList] = useState([])

    //get parts function, used anytime useEffect cannot handle getting all parts
    const getParts = () => {
        Axios.get('http://localhost:3001/getParts',
        {params: {
          barcode: part.barcode, 
          name: part.name, 
          locationID: part.locationID, 
          project: part.project, 
          manufacturer: part.manufacturer, 
          model: part.model, 
          serialNum: part.serialNum, 
          notes: part.notes,
          customAttributes: part.customAttributes,
          showLoan: showLoan
        }}).then((response)=>{
          setPartList(response.data)
        });
      }


    //trash icon----------------------------------------------------------------------------
    const [deleteCount, setDeleteCount] = useState(0)

    const [idList, setIdList] = React.useState([])

    const [checkedState, setCheckedState] = useState(
        new Array(partList.length).fill(false)//an array where every index represents a checkbox's checked value
    );//this does create a warning because there is no single source of truth - meaning a user can control whether or not the checkbox is changed via a click but also changing search modes will change the value of the checkbox. For our use case this is actually what we want

    const checkboxHandler = (index, checked, id) =>{
        
        //returns the updated array of which checkboxes are checked
        const updatedCheckedState = checkedState.map((item, i) =>
            i === index ? !item : item//when current index matches index of checked checkbox we change checked value
        );

        //sets the checked state 
        setCheckedState(updatedCheckedState);

        
        //sets the idList
        if(checked){
            setIdList((prev)=>[...prev, id])
        }
        else{//remove id from idlist using filter method
            setIdList(curr=>(curr.filter(i=>{return i!==id})))
        }
    }
    
    const deleteParts = (id) => {
        Axios.delete(`http://localhost:3001/deleteParts/${id}`).then((response)=>{
          setDeleteCount((prev)=>(prev+1))
        })
    }

    const deleteMultipleParts = () => {
        for(let i = 0; i < idList.length; i++){
            deleteParts(idList[i])
        }
        setIdList([])//clear idList now that all of its parts are deleted
    }


    //show loaned parts----------------------------------------------------------------------------
    const [showLoan, setShowLoan] = React.useState(false)

    const showLoanHandler = (e) => {
        if(e.target.checked){
            setShowLoan(true)
        }
        else{
            setShowLoan(false)
        }
    }

    //primary use of this useEffect is to query results when showLoan changes
    useEffect(() => {
        Axios.get('http://localhost:3001/getParts',
        {params: {
          barcode: part.barcode, 
          name: part.name, 
          locationID: part.locationID, 
          project: part.project, 
          manufacturer: part.manufacturer, 
          model: part.model, 
          serialNum: part.serialNum, 
          notes: part.notes,
          customAttributes: part.customAttributes,
          showLoan: showLoan
        }}).then((response)=>{
          setPartList(response.data)
        });

      }, [deleteCount, part, showLoan, setPartList])
    
    //searchbar----------------------------------------------------------------------------
    const [query, setQuery] = React.useState("")
    
    const searchbarHandler = (e) => {
        searchModeToggler(e)
        setPart((prev)=>{return {...prev, barcode:"", name: '', locationID:'', project:'', manufacturer:'', model:'', serialNum:'', notes:'', customAttributes:''}})
    }

    //function using fuse.js to fuzzy search filter results by name
    const partSearch = (partList) => {
        //uncomment lines below if you want some results to display when user clicks "search by name" search bar
        //if(query === ''){
        //    return partList
        //}
        //else{
            //https://www.youtube.com/watch?v=GZl-yEz4_qw
            const fuse = new Fuse(partList, {
                keys: ['name'],//searches on this attribute
                includeScore: true//0 is perfect, maybe later we can limit results to a scoreline
            })

            const results = fuse.search(query)
            return results.map(result=> result.item)
        //}
        
    }
    
    
    //Advanced & Map search buttons-----------------------------------
    const [searchMode, setSearchMode] = useState('')

    //everytime the searchMode state changes we want to do the following
    useEffect(()=>{
        //clear all previously checked checkboxes----
            //returns the updated array of which checkboxes are checked
            const updatedCheckedState = partList.map((prev)=>(false));//set entire checked array to false

            //sets the checked state 
            setCheckedState(updatedCheckedState);
        //-----------------
        
        //clear the idList so no parts are accidentally deleted
        setIdList([])

        //clear searchbar and query to remove highlight around part name
        document.getElementById('searchbar').value=''
        setQuery('')


    },[searchMode, partList, setCheckedState])

    //function to toggle searchmode state
    const searchModeToggler = (e) => {
        const {name, value} = e.target
    
        if(value === 'advanced'){
          setSearchMode('advanced')

          //reset part
          setPart({barcode:"", name: '', locationID:'', project:'', manufacturer:'', model:'', serialNum:'', notes:'', customAttributes:''})
        }

        else if(value === 'map'){
            setSearchMode('map')
        }

        else if(name === 'searchbar' && searchMode !== 'bar'){
            setSearchMode('bar')
            
            //reset part
            setPart({barcode:"", name: '', locationID:'', project:'', manufacturer:'', model:'', serialNum:'', notes:'', customAttributes:''})
        }
    }

    return(
        <div>
            <div className="col-10 offset-1 d-flex justify-content-evenly align-items-center">
                {idList[0] !== undefined && <img src={trash} alt="DELETE" className="m-1" style={{width: '40px', cursor: 'pointer'}} onClick={deleteMultipleParts}/>}

                <div className="form-check m-1">
                    <input className="form-check-input" type="checkbox" id="loanedParts" onClick={showLoanHandler}/>
                    <label className="form-check-label" htmlFor="loanedParts">Show Loaned Parts</label>
                </div>

                <input className="m-1" name='searchbar' id='searchbar' type="text" placeholder='Search by name...' onChange={e=>setQuery(e.target.value)} onClick={(e)=>searchbarHandler(e)}/>

                <button className="btn btn-primary m-1" value='advanced' onClick={(e)=>searchModeToggler(e)}>Advanced Search</button>

                <button className="btn btn-primary m-1" value='map' onClick={(e)=>searchModeToggler(e)}>Map Search</button>
            </div>

            {searchMode === 'advanced' && 
                <AdvancedSearch 
                    part={part}
                    setPart={setPart}
                    locationList={locationList}
                />
            }

            {searchMode === 'map' && 
                <MapSelection
                    setPart={setPart}
                    setMapDisplay={setSearchMode}
                />
            }


            {searchMode !== 'map' && searchMode !== '' && <Result 
                getParts={getParts}
                partList={searchMode === 'bar' ? partSearch(partList): partList}
                setPartList={setPartList}
                showLoan={showLoan}
                idList={idList}
                checkedState={checkedState}
                checkboxHandler={checkboxHandler}
                query={query}
            />}

        </div>
    )
}
