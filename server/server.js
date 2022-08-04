//set up express server
const express = require('express')
const app = express()

const open = require('open')//to open links on user's machine

//used to run the create-react-app build (the client folder's contents). src: https://create-react-app.dev/docs/deployment/#other-solutions
//REMOVE THIS COMMENT WHEN DEVELOPING/*        
        const path = require('path')
        
        app.use(express.static(path.join(__dirname, 'build')));
        
        app.get('/', function (req, res) {
          res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
//REMOVE THIS COMMENT WHEN DEVELOPING*/
//------------- for this to work I moved the build folder from the client folder to the server folder

//allow us to get data from another origin's port
const cors = require('cors')

//import mysql
const mysql = require('mysql')

app.use(express.json())//allows app to receive request objects from clients as json objects
app.use(cors())

//connect to database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Password1",
    database: "inventory_tool",
});


//start app
app.listen(3001, () => {open('http://localhost:3001/'); console.log("app running at http://localhost:3001/")})

//ADD-----------------------------------------------------------------------------------

//create an api REST endpoint: '/addPart' is the route
app.post('/addPart', (req, res) => {
    const barcode = req.body.barcode 
    const name = req.body.name==='' ? null : req.body.name
    const locationID = req.body.locationID 
    const project = req.body.project 
    const manufacturer = req.body.manufacturer 
    const model = req.body.model 
    const serialNum = req.body.serialNum 
    const notes = req.body.notes
    const onLoan = req.body.onLoan ? req.body.onLoan : 0//cheap fix for onLoan can not be null error
    const customAttributes = req.body.customAttributes

    if(customAttributes === ''){
        db.query('INSERT INTO parts (barcode, name, locationID, project, manufacturer, model, serialNum, notes, onLoan) VALUES (?,?,?,?,?,?,?,?,?);', 
        [barcode, name, locationID, project, manufacturer, model, serialNum, notes, onLoan], 
        (err, result) => {
            if(err){
                res.send(err)
                console.log(err)
            } else {
                res.send(result)
            }
        });
    }
    else{
        db.query('INSERT INTO parts (barcode, name, locationID, project, manufacturer, model, serialNum, notes, onLoan, customAttributes) VALUES (?,?,?,?,?,?,?,?,?,?);', 
            [barcode, name, locationID, project, manufacturer, model, serialNum, notes, onLoan, customAttributes], 
            (err, result) => {
                if(err){
                    res.send(err)
                    console.log(err)
                } else {
                    console.log("success")
                    res.send(result)
                }
            });
    }
})


//GET-----------------------------------------------------------------------------------
app.get('/getParts', (req, res) => {
    const barcode = '%'+req.query.barcode+'%'
    const name = '%'+req.query.name+'%' 
    const locationID = '%'+req.query.locationID+'%' 
    const project = '%'+req.query.project+'%' 
    const manufacturer = '%'+req.query.manufacturer+'%' 
    const model = '%'+req.query.model+'%' 
    const serialNum = '%'+req.query.serialNum+'%' 
    const notes = '%'+req.query.notes+'%'
    const customAttributes = '%'+req.query.customAttributes+'%'
    const showLoan = req.query.showLoan

    if(customAttributes === '%undefined%' || customAttributes === '%%'){//if the user does not search on custom attributes
        if(showLoan === 'true'){
            db.query('SELECT * FROM parts WHERE barcode LIKE ? AND name LIKE ? AND locationID LIKE ? AND project LIKE ? AND manufacturer LIKE ? AND model LIKE ? AND serialNum LIKE ? AND notes LIKE ?;',
            [barcode, name, locationID, project, manufacturer, model, serialNum, notes],
            (err, result) => {
                if(err){
                    res.send(err)
                } else {
                    res.send(result)
                }
            })
        }
        else{//if we do not want to query the parts that are out onLoan (meaning exclude parts where onLoan=1)
            db.query('SELECT * FROM parts WHERE onLoan = 0 AND barcode LIKE ? AND name LIKE ? AND locationID LIKE ? AND project LIKE ? AND manufacturer LIKE ? AND model LIKE ? AND serialNum LIKE ? AND notes LIKE ?;',
            [barcode, name, locationID, project, manufacturer, model, serialNum, notes],
            (err, result) => {
                if(err){
                    res.send(err)
                } else {
                    res.send(result)
                }
        })
        }
    }
    else{//if miscObject is not empty-------------------------------------------------------
        if(showLoan === 'true'){
            db.query('SELECT * FROM parts WHERE barcode LIKE ? AND name LIKE ? AND locationID LIKE ? AND project LIKE ? AND manufacturer LIKE ? AND model LIKE ? AND serialNum LIKE ? AND notes LIKE ? AND customAttributes LIKE ?;',
            [barcode, name, locationID, project, manufacturer, model, serialNum, notes, customAttributes],
            (err, result) => {
                if(err){
                    res.send(err)
                } else {
                    res.send(result)
                }
        })
        }
        else{//if we do not want to query the parts that are out onLoan (meaning exclude parts where onLoan=1)
            db.query('SELECT * FROM parts WHERE onLoan = 0 AND barcode LIKE ? AND name LIKE ? AND locationID LIKE ? AND project LIKE ? AND manufacturer LIKE ? AND model LIKE ? AND serialNum LIKE ? AND notes LIKE ? AND customAttributes LIKE ?;',
            [barcode, name, locationID, project, manufacturer, model, serialNum, notes, customAttributes],
            (err, result) => {
                if(err){
                    res.send(err)
                } else {
                    res.send(result)
                }
        })
        }
    }
    
    
})


app.get('/getLocations', (req, res) => {
    db.query('SELECT * FROM locations;',
        (err, result) => {
            if(err){
                res.send(err)
            } else {
                res.send(result)
            }
    })
})

//UPDATE-----------------------------------------------------------------------------------

app.put('/updateParts', (req, res) => {
    const field = req.body.field
    const fieldVal = req.body.fieldVal
    const id = req.body.id
    
    db.query(`UPDATE parts SET ${field} = ? WHERE partID = ?;`, [fieldVal, id],
    (err, result) => {
        if(err){
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

//DELETE-----------------------------------------------------------------------------------

app.delete('/deleteParts/:id', (req, res) => {
    const id = req.params.id

    db.query("DELETE FROM parts WHERE partID = ?;", id, 
    (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})