import './App.css';
import Axios from 'axios'//allows us to make requests of an api
import React, { useEffect, useState } from 'react';
import Header from './Components/Header.js'
import addIcon from './Images/addicon.png'
import searchPageIcon from './Images/searchpageicon.png'
import Searchbar from './Components/Search/Searchbar';
import AddPart from './Components/Add/AddPart';

function App() {

  //list of locations will be loaded from db
  const [locationList, setLocationList] = useState([])

  //on component mount (initial page render) the locationList state is populated from the database table: locations
  useEffect(
    () => {
      Axios.get('http://localhost:3001/getLocations').then((response)=>{
        setLocationList(response.data)
      });
    }
  ,[])//empty dependency array calls useEffect only on component mount

  

  //state object for uploading a single part to db
  const [part, setPart] = useState({barcode:"", name: '', locationID:'', project:'', manufacturer:'', model:'', serialNum:'', notes:'', onLoan: 0, customAttributes:''})

  //state to toggle whether or not we are in add mode (if not in add mode, we are in search mode)
  const [addPartMode, setAddPartMode] = useState(false)

  //function to toggle whether or not we are in add mode (if not in add mode, we are in search mode)
  const headerButtonHandler = (e) => {
    const {value} = e.target
    
    if(value === 'search'){
      setAddPartMode(false)
    }
    else if(value === 'add'){
      setAddPartMode(true)
    }
  }


  return (
    <div className="App">
      
      <Header 
        headerButtonHandler = {headerButtonHandler}
      />

      {!addPartMode && <div>

          <img className='my-3' style={{width: '250px'}} src={searchPageIcon} alt='SEARCH'/>
      
          <Searchbar 
            part={part}
            setPart={setPart}
            locationList={locationList}
          />
        </div>
      }

      {addPartMode && <div>

          <img className='mb-1' style={{width: '300px'}} src={addIcon} alt='ADD'/>

          <AddPart
            part={part}
            setPart={setPart}
            locationList={locationList}
          />
        </div>
      }
      

    </div>
  );
}

export default App;
