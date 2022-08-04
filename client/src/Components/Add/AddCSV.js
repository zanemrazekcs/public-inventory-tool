import React, { useState } from "react";
import Axios from 'axios'
const Papa = require('papaparse')

export default function AddCSV(props){
  const {errorList, setErrorList, clearErrorList} = props

  const [file, setFile] = React.useState()
  const fileReader = new FileReader()

  const [show1000Message, setShow1000Message]= useState(false)


  const handleOnChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleOnSubmit = (e, proceed) => {
    e.preventDefault()//doesnt allow page to reload

    clearErrorList()
  
    if(file){//if file has been uploaded
      fileReader.onload = function (event){
        const text = event.target.result//the file text from fileReader.readAsText(file line)
        
        const csvData = {}//new object to store parsed data to

        Papa.parse(text, {//use papaparse library to parse csv
          header: true,//will recognize first row as headers
          complete: function(results){
            csvData.data = results.data
            csvData.errors = results.errors
            csvData.meta = results.meta
          }
        })
        
        if(csvData.data.length > 1000 && proceed === false){//triggers warning if more than 1000 rows in the csv
          setShow1000Message(true)
        }
        else{
          importToDB(csvData.data)
        }
      }
      //https://developer.mozilla.org/en-US/docs/Web/API/FileReader
      fileReader.readAsText(file)//use fileReader on file state this will trigger fileReader.onload (20ish lines above here)
    }
  }
    
    
  const importToDB = (csvData) => {
  
      for(let i = 0; i < csvData.length; i++){
        let temp = csvData[i]
  
        let barcode = temp.barcode
        let name = temp.name 
        let locationID = temp.locationID
        let project = temp.project
        let manufacturer = temp.manufacturer
        let model = temp.model
        let serialNum = temp.serialNum
        let notes = temp.notes
        let onLoan = temp.onLoan
        let customAttributes=temp.miscObject
        addPartByCSV(barcode, name, locationID, project, manufacturer, model, serialNum, notes, onLoan, customAttributes)
        
      }
  }

  const addPartByCSV = (b,na,l,p,ma,mo,s,no,ol,ca) => {
      Axios.post('http://localhost:3001/addPart', 
      {
        barcode: b, 
        name: na, 
        locationID: l, 
        project: p, 
        manufacturer: ma, 
        model: mo, 
        serialNum: s, 
        notes: no,
        onLoan: ol === '' ? 0 : ol,//if onLoan is missing values in csv auto fill in 0
        customAttributes: ca,
      }
      ).then((response)=>{
  
        
        if(response.data.sqlMessage !== undefined){
              
          if(errorList[0] === 'success'){//TEST
              setErrorList(()=>[{errno: response.data.errno, code: response.data.code, message: response.data.sqlMessage}]);
          }
          else{
              setErrorList((prev)=>[...prev, {errno: response.data.errno, code: response.data.code, message: response.data.sqlMessage}]);
          }
        }    
        else{
          setErrorList(['success'])
        }
  
      }).catch((err)=>{
        setErrorList((prev)=>[...prev, {err: err}]);
      })
  };


  return(
    <div>
      <div>
        <h1>Add Part Via CSV</h1>
      </div>

      <form className="col-6 offset-3">
        <h5>Download a sample CSV template <a className="mb-3 link-primary" href='/samplePart.csv' download>HERE</a></h5>        

        <input 
            className="form-control m-auto mb-3"
            type="file" 
            id="csvFileInput"
            accept=".csv"
            onChange={handleOnChange} 
        />

        <button
            className="btn btn-success"
            onClick={(e)=>{
                handleOnSubmit(e, false)
            }}
        >Import CSV</button>

      </form>

      {show1000Message === true && <div>
          <h3 style={{color: 'red'}}>It is likely that your browser resources can not safely support this upload, either use Firefox or smaller files.</h3>
          <button
            className="btn btn-danger"
            onClick={(e)=>{handleOnSubmit(e, true)}}
          >Proceed Anyway</button>
      </div>}

    </div>
  )
}