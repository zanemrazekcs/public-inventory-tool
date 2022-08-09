
# Inventory Tool Documentation

# Table of Contents

- [User Instructions](#user-instructions)
- [Important notes for the tool manager/developer](#important-notes-for-the-tool-managerdeveloper)
- [Tree Structure of React Components](#tree-structure-of-react-components)
- [Main Page](#main-page)
    - [App.js](#appjs)
    - [Header.js](#headerjs)
- [Search](#search)
    - [Searchbar.js](#searchbarjs)
    - [AdvancedSearch.js](#advancedsearchjs)
    - [MapSelection.js](#mapselectionjs)
    - [Box.js](#boxjs)
- [Results](#results)
    - [Results.js](#resultjs)
    - [Table.js](#tablejs)
    - [Pagination.js](#paginationjs)
    - [PartRow.js](#partrowjs)
    - [TableData.js](#tabledatajs)
- [Add](#add)
    - [AddPart.js](#addpartjs)
    - [AddForm.js](#addformjs)
    - [AddCSV.js](#addcsvjs)
- [Server](#server)
- [MySQL Database: inventory_tool](#mysql-database-inventorytool)
- [Known Bugs](#known-bugs)
- [Fixed Bugs](#fixed-bugs)
- [Features to Modify](#features-to-modify)

# User Instructions

[On first load of app](#user)

[When searching for a part](#user-1)

[Viewing, modifying, and deleting results](#user-2)

[Adding parts](#user-3)



# Important notes for the tool manager/developer

### To run the app navigate to the server folder and click the file "server-OS" (where OS is the name of the OS your machine is running)


### When making any changes to the app

The server code is located in the server folder's server.js file.

The client code's starts in the client folder's index.js file which renders the App.js component which begins to render a plethora of components which arestored in the components folder. 

1. Comment the following code out of server.js (located within the server folder), upon doing so the front end will no longer be run on port 3001.
    ```JavaScript
        //used to run the create-react-app build (the client folder's contents). src: https://create-react-app.dev/docs/deployment/#other-solutions
        const path = require('path')
        app.use(express.static(path.join(__dirname, 'build')));
        app.get('/', function (req, res) {
          res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
        //------------- for this to work I moved the build folder from the client folder to the server folder
    ```
2. Open two terminals in VS Code while developing and testing
    - In terminal 1 cd into the client folder of the project. You can run the front end site by typing the command "mpm start" into the terminal and then opening localhost:3000.
    - In terminal 2 cd into the server folder of the project. You can run the back end server by typing the command "node server.js" into the terminal. (note the server will open localhost:3001 which will read "cannot get /" just close the tab, this is no big deal while developing)
3. After making desired changes type npm run build
4. Move the build folder from the client folder to the server folder and uncomment the lines of code from the first step.
5. Now by typing "node server.js in terminal 2 (the server terminal) the entire front end and back end programs run
6. Make this an executable file by typing "pkg ." into terminal 2
    - Optional: add specific versions of node and OSs to make the executable file for using: "targets": [ "node12-win-x64" ],
7. Run the app by clicking the executable file that corresponds with your OS

### If you wish to modify a locationID's value you must make the changes

1. the locations table in the database. 
2. Under the "Room & Box Arrays" that is within the "Map" folder that is within the "Components" folder modify the locationID stored in the "room#.js" file (# can be 1, 2, or 3 in this file name) which is the top view of the map. 
3. Under the same "Room & Box Arrays" folder modify the locationID in the appropriate "left#", "right#", "front#", "back#" file under the appropriate "room#" folder (# can be 1, 2, or 3 in this file name). This will reflect the locstionID change in the side wall view of the map. 
4. change the physical label in the lab.

# Tree Structure of React Components

```
└── App.js
        ├── Header.js
        │
        ├── Searchbar.js
        │           │
        │           ├── AdvancedSearch.js
        │           │
        │           ├── MapSelection.js
        │           │               │
        │           │               └── Box.js
        │           └── Results.js
        │                       ├── Table.js
        │                       │        │
        │                       │        └── PartRow.js
        │                       │                   │
        │                       │                   └── TableData.js
        │                       ├── Pagination.js
        │                       │
        │                       └── Box.js
        └── AddPart.js
                    │
                    ├── AddForm.js
                    │           │
                    │           └── MapSelection.js
                    │                           │
                    │                           └── Box.js
                    └── AddCSV.js
```

# Main page

[Table of Contents](#table-of-contents)

## User:

The user will start the app and will immediately see a header (Header.js) at the top of the page. The left side of the header shows the IDATS logo and the text “IDATS Inventory Tool.” The right side of the header displays two buttons, Search and Add Part. The user will click the button that corresponds with the features they want to utilize for the tool. The default is Search so the user will see the search component already loaded (Searchbar.js).

## Code:

### ___App.js___

States
- locationList (array)
    - Holds the locations stored in the database locations table.
- part (object)
    - Object that contains attributes used to add a single part to the database or query a single part against the database.
- addPartMode (boolean)
    - If this state is false, default search mode is displayed, if true, add part features will be displayed.

useEffect
- On component mount (initial page render) the locationList state is populated from the database table: locations

    ```JavaScript
    useEffect(
        () => {
          Axios.get('http://localhost:3001/getLocations').then((response)=>{
            setLocationList(response.data)
          });
        }
    ,[])//empty dependency array calls useEffect only on component mount
    ```

Functions
- headerButtonHandler Params: (Event object)
    - Clicking the “Search” and “Add Part” buttons will call this function and will change the value of the addPartMode state.

Returns
- [Header.js](#headerjs) component

    ```JavaScript
    <Header 
        headerButtonHandler = {headerButtonHandler}
    />
    ```
- searchPageIcon (visible when addPartMode is false) <img style="width: 40px" src="client/src/Images/searchpageicon.png" alt='SEARCH'/>
    - Image displayed on screen when user is using search features 

- [Searchbar.js](#searchbarjs) component (visible when addPartMode is false)

    ```JavaScript
    <Searchbar 
        part={part}
        setPart={setPart}
        locationList={locationList}
    />
    ```
- addIcon (visible when addPartMode is true) <img style="width: 40px" src="client/src/Images/addicon.png" alt='ADD'/>
    - Image displayed on screen when user is using add features 

- [AddPart.js](#addpartjs) component (visible when addPartMode is true)

    ```JavaScript
    <AddPart
        part={part}
        setPart={setPart}
        locationList={locationList}
    />
    ```

### ___Header.js___

Props
- headerButtonHandler

Returns
- Navbar
    - IDATSLogo image <img style="width: 40px" src="client/src/Images/IDATSLogo.png" alt='IDATS Logo'/>
    - "IDATS Inventory Tool" text that serves as the navbar brand.
    -Unordered list of buttons
        - "Search" button
            - onClick call headerButtonHandler
        - "Add Part" button
            - onClick call headerButtonHandler

# Search

[Table of Contents](#table-of-contents)

## User:

Upon page load or click of the “Search” button located in the header the user will see an in-line display with a checkbox labeled “Show Loaned Parts,” a search bar, a button labeled “Advanced Search,” and a button labeled “Map Search.” Below this line the result table column headers are on display. If the user selects rows of data under the selector column a garbage can icon will appear to the left of the “Show Loaned Parts” checkbox.” If the user clicks the garbage can icon, those rows of data will be deleted. If the user checks the “Show Loaned Parts” checkbox another column will appear that will indicate whether or not a part is loaned out and all parts that have been loaned out will appear in the search results. If the user types into the search bar, the results will be filtered based on whether the name attribute for the row of data fuzzily matches the text in the search bar. Any exact name matches via the search bar will be highlighted. 

When the user clicks the “Advanced Search” button to the right of the search bar a form appears and results are displayed in the table below. The input boxes of the form are labeled with their corresponding part attributes. As the user types into any of the input boxes, the results are filtered based on the entries in the respective attribute input boxes. If the user clicks the red “CLEAR” button below the form all of the input boxes will be cleared. 

When the user clicks the “Map Search” button to the right of the search bar the results are temporarily hidden and a map display appears. There is a large heading that tells the user if the perspective is a top view or a side view as well as instructions to click the appropriate box and then click confirm for a series of maps to choose a location. Upon the final click of confirm on the final display the results are shown in table form.



## Code:

### ___Searchbar.js___

Props
- part
- setPart
- locationList

States
- partList (array)
    - A list of parts that is populated from the database.
- idList (array)
    - Stores the id of every row of data that has been selected with its respective checkbox.
- checkedState (array)
    - Stores a true false value for every checkbox in the "selector" column. This allows the app to clear all checkboxes when switching search modes thus preventing accidental updates or deletes
        ```JSX
        const [checkedState, setCheckedState] = useState(
            new Array(partList.length).fill(false)//an array where every index represents a checkbox's checked value
        );//this does create a warning because there is no single source of truth - meaning a user can control whether or not the checkbox is changed via a click but also changing search modes will change the value of the checkbox. For our use case this is actually what we want
        ```
- deleteModal (boolean)
    - Determines whether or not a warning modal will appear
- showLoan (boolean)
    - When the “Show Loaned Parts” checkbox is checked, this value will be set to true and the results displayed to the user will display the parts that are out on loan and each part’s loan status.
- query (string)
    - Stores whatever value is currently in the search bar.
- searchMode (string)
    - Keeps track of which method of search the user has selected so appropriate features can be displayed.
- deleteCount (int)
    - Tracks how many times delete was called. The count itself is not important, what is important is that when this value changes the useEffect hook is called and the partList is updated.

useEffect
- Any time the part state (which was passed down as a prop), the deleteCount state, or the showLoan state updates, the partList will be updated. This is especially important when the user requests the loaned parts to be in view.

    ```JavaScript
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

    }, [deleteCount, part, showLoan, setPartList])//anytime one of these values changes useEffect is called
    ```
- Anytime the searchMode state is modified the idList will be cleared, all checkboxes under the "selector" column will be unchecked, and the "search by name" searchbar and query state will be cleared
    ```JSX
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
    ```
functions
- getParts
    - Populates partList using an SQL SELECT statement at the GET endpoint located in server.js

        ```JavaScript
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
        ```
- checkboxHandler 
    - Parameters
        - Index - the row index in the result table of the checkbox that has been clicked
        - Checked - boolean property that determines if the checkbox is checked 
        - id - the id of the part that was selected
    - If the checkbox is now checked, the respective id will be added to the idList state. If the box was unchecked, the corresponding id will be removed from the idList state. The checkedState will also be updated to refelct the changes.
        ```JavaScript
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
        ```
- hideModal
    - sets the deleteModal state to false
- deleteParts
    - Parameters
        - id - the id of the part to be deleted
    - Calls the DELETE endpoint from our server.js api to delete the part with a matching id. Then it increments the deleteCount state so the useEffect hook runs and gets the updated partList.

        ```JavaScript
            const deleteParts = (id) => {
                Axios.delete(`http://localhost:3001/deleteParts/${id}`).then((response)=>{
                    setDeleteCount((prev)=>(prev+1))
                })
            }
        ```
- deleteMultipleParts
    - For each part represented in idList deleteParts is called. Then idList is cleared

        ```JavaScript
            const deleteMultipleParts = () => {
                for(let i = 0; i < idList.length; i++){
                    deleteParts(idList[i])
                }
                setIdList([])//clear idList now that all of its parts are deleted

                hideModal()//hides the warning modal
            }
        ```
- showLoanHandler Params: (Event Object)
    - If the “Show Loaned Parts” checkbox is checked, the showLoan state is set to true, else the state is set to false.
- searchbarHandler
    - When the search bar is clicked, this function calls the searchModeToggler function (described later), and resets the value of the part state prop (except for onLoan because that is handled by its own checkbox) so the full set of parts can be searched on.
- partSearch Params: (partList)
    - Conducts a fuse.js search of the partList based on the query state updated from the search bar.
    - Return: partList filtered by the part names matching the query

        ```JavaScript
        const partSearch = (partList) => {
            const fuse = new Fuse(partList, {
                keys: ['name'],//searches on this attribute
            })
            const results = fuse.search(query)
            return results.map(result=> result.item)
        }
        ```
- searchModeToggler Params: (Event object)
    - Sets the value of the searchModeState appropriately and handles some minor changes from mode to mode to reduce bugs. These minor changes are addressed in the comments of the code.
        ```JavaScript
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
        ```
Returns
- Garbage can icon (visible when idList is not empty (idList[0] !== undefined).)
    - onClick sets deleteModal state to true and a warning modal will appear
- Delete Warning modal (visible when deleteModal state === true)
    - Clicking the red "DELETE" button will call deleteMultipleParts
    - Clicking the cancel button or closing the modal will not result in the parts beung deleted
    - Uses react-bootstrap libraries for the Modal and Button tags
        ```JSX
            {<Modal show={deleteModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>WARNING</Modal.Title>
                </Modal.Header>
        
                <Modal.Body>Are you sure you want to delete these parts</Modal.Body>
                    
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                    <Button variant="danger" onClick={deleteMultipleParts}>DELETE</Button>
                </Modal.Footer>
            </Modal>}
        ```
- “Show Loaned Parts” label and checkbox
    - onClick calls showLoanHandler
- Input textbox for search bar
    - onChange sets the query state to the current value in the search bar
    - onClick calls searchbarHandler
- “Advanced Search” button
    - onClick calls searchModeToggler
- “Map Search” button
    - onClick calls searchModeToggler
- [AdvancedSearch.js](#advancedsearchjs) component (visible when searchMode === 'advanced')

    ```Javascript
        <AdvancedSearch 
            part={part}
            setPart={setPart}
            locationList={locationList}
        />
    ```
- [MapSelection.js](#mapselectionjs) component (visible when searchMode === 'map')

    ```Javascript
        <MapSelection
            setPart={setPart}
            setMapDisplay={setSearchMode}
        />
    ```
- [Result.js](#resultjs) component (visible when searchMode !== ‘map’ or '' (because the only time the results should be hidden is when the map is on display so the screen is not cluttered and when the user first logs on))

    ```JavaScript
        <Result 
            getParts={getParts}
            //if searching by name using the searchbar we call partSearch function to get a filtered partList
            partList={searchMode === 'bar' ? partSearch(partList): partList} 
            setPartList={setPartList}
            showLoan={showLoan}
            idList={idList}
            checkedState={checkedState}
            checkboxHandler={checkboxHandler}
            query={query}
        />
    ```
### ___AdvancedSearch.js___
Props
- part
- setPart
- locationList

Functions
- partSetter Param: (Event object)
    - Sets the attribute of the part state (that corresponds with the event target’s name) to the current event target’s value.

    ```JavaScript
        //sets appropriate attribute of part
        const partSetter = (event) => {
            setPart(prev => {return{...prev, [event.target.name]:event.target.value}})
        }
    ```

Returns
- Input text boxes for barcode, name, project, manufacturer, model, serial number, notes, and custom attributes
    - onChange calls partSetter
- Datalist textbox for locationID
    -List contains options that are mapped from the locationList prop and is filtered as the user types into the textbox.
    - onChange calls partSetter



### ___MapSelection.js___

Props
- setPart
- setMapDisplay={setSearchMode}


Imported files
- This component has 16 imported JavaScript array files. These array files are crucial as they define the layout and contents of each room and wall in said room.

    ```JavaScript
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
    ```
States
- map
    - state that determines which imported array will be displayed as the map of boxes
- roomView
    - state that determines which view heading is displayed ("top view", "side view")
- room
    - string representation of what room the user is looking at to determine the function that will handle the map rendering

Variables
- roomElements
    - holds an array of [Box.js](#boxjs) components that corresponds to one of the imported array files, when rendered this creates a map out of the box components of a room or wall (also appears in [Result.js](#resultjs))

        ```JavaScript
            let roomElements = map.map((box)=>(
                <Box 
                    key={box.arrName} //unique identifier for each box element
                    on={box.on} //whether the box is currently green or not
                    text={box.text} //descriptive text on each box in the map
                    gridArea={box.gridArea} //determines where on the map each box appears
                    toggle={() => toggleBoxGreen(box.id)} //this function toggles individual boxes on or off
                />
            ))  
        ```
Functions
- toggleBoxGreen
    - Parameter
        - id - the id of the box that was clicked
    - Sets the map using the same array as before, but when the map function comes across the box whose id matches the paramter of the function, that box's on value will be toggled (either on or off) all other boxs's "on" value will be set to false
        ```JavaScript
            const toggleBoxGreen = (id) => {
                setMap(prevMap => {
                    return prevMap.map((box)=> {
                        return box.id === id ? {...box, on: !box.on} : {...box, on: false}
                    })
                })
            }
        ```
- roomSetter
    - every time a box element on a map is selected and confirmed, this function is called to render the next map to appear, this function calls other functions depending on the value of the room state

        ```JavaScript
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
                else{ //if value of room is not set it implies we are at the first map
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
                ))
        
            }
        ```
- room1Setter - room2Setter - room3Setter
    - When the room state has been set to 'room1,' 'room2,' or 'room3', this function sets the map to the selected wall in the room
        ```JavaScript
            //room2Setter & room3Setter follow the same exact format but the map names are differnet (e.g left2 instead of left1)
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
                            setRoomView('top')//the middle of the room is from a top view perspective unlike the other walls
                        }
                    }
                })
                //sets the room state to locID - meaning a box clicked on a map of a room wall will be handled as a locationID
                setRoom('locID')
            }
        ```
- locationIDSetter
    - iterates through each box in the current map, when the box that is on is found, the part prop's locationID is set to the locationID stored in the specified box
        ```JavaScript
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
        ```
Returns
- Heading that displays "Top View" or "Side View" depending on the value of the roomView state
- Paragraph text that displays "Pick what room the part is stored in," "Pick what section of the room the part is stored in," or "Pick what unit the part is stored in" depending on the value of the room state
- The roomElements array which is an array of [Box.js](#boxjs) components that correspond with the current array stored in the map state.
- Paragraph that specifies instructions saying, "Click the corresponding box then click confirm"
- "CONFIRM" button
    - onClick calls roomSetter
- Heading that displays "Top View" or "Side View" depending on the value of the roomView state
- Paragraph text that displays "Pick what room the part is stored in," "Pick what section of the room the part is stored in," or "Pick what unit the part is stored in" depending on the value of the room state


### ___Box.js___

Props
- key
- on
- text
- gridArea
- toggle
- height
- width

Variables
- styles (object)
    - sets the particular styles of the particular box (not the default box styles)
        ```JavaScript
            const styles = {
                backgroundColor: on ? "#00FF00" : "transparent",
                gridArea: gridArea,
                height: height,
                width: width
            }
        ```
Returns
- div that represents a box
    - key uniquely identfies the box
    - className "box" defines the general CSS attribites of a box
        ```CSS
            .box {
              height: auto;
              width: auto;
              border: 1px solid black;
              cursor: pointer;
            }

        ```
    - style contains custom box styles from the styles const
    - onClick calls whatever function is passed as a prop to toggle the box on or off
    - p tags specify the descriptive text for the box to display
    ```JavaScript
        <div 
            key={key}
            className="box" 
            style={styles}
            onClick={toggle}
        >
            <p>{text}</p>
        </div>
    ```

# Results

[Table of Contents](#table-of-contents)

## User:

Search results are displayed below any visible search forms. The results first appear in a table. If the maginfying glass under the "Show on MAP" column in a row is clicked, the results will filter down to only the single record that was clicked. Below this single record will be a top view of the room that the part is stored in with its storage unit appearing green along with a description that gives directions on how to get to the part. If the user clicks the "DONE" button the map will disappear and when the user clicks the "Search by name..." text input or modifies the search terms in the Advanced Search form all other relevant results will reappear. If the user hovers over any attribute of a part an edit icon will appear below the value. If the user clicks this icon an edit box along with an "update" button and an "X" appear. The user can make any changes in the text box and click "update" to push them to the database or "X" if the user does not want to apply the edits they made to the part. If the Selector column checkbox is clicked for any other parts those parts will also reflect the update made to the part. Up to 50 results will be displayed on one page of the table. At the bottom left corner of the table is a navbar of pages where the user can navigate between pages of results when more than 50 are displayed.

## Code:

### ___Result.js___

Props
- getParts
- partList
- setPartList
- showLoan
- idList
- checkedState
- checkboxHandler
- query

States
- currentPage
    - the current page of results
- recordsPerPage
    - how many posts per page to display in the table
- showOnMap
    - determines whether or not the results map is displayed
- map
    - contains the array of objects that makes up a map
- currentID
    - stores the ID of whatever part is being displayed on the map

useRef
- totalRecords
    - total amount of records to display among all pages in the table

Variables
- roomElements
    - holds an array of [Box.js](#boxjs) components that corresponds to one of the imported array files, when rendered this creates a map out of the box components of a room or wall (code snippet in [MapSelection.js](#mapselectionjs))

Functions
- getCurrentPageResults Param: (partList)
    - calculates the range of indexes in partList to display proper set of records in the current table page
        ```JSX
            const getCurrentPageResults = (partList) => {
                totalRecords.current = partList.length;

                //finds the index in partList of first record to show in table
                const indexOfLastRecord = currentPage * recordsPerPage

                //finds the index in partList of last record to show in table
                const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

                //slices partList to only show desired page of results from partList
                const currentRecords = partList.slice(indexOfFirstRecord, indexOfLastRecord)

                //returns values of partList to display in table
                return currentRecords
            }
        ```
- toggleMapResult
    - Parameters
        - id - the locationID of the part being searched for
        - room - the room the part is located in
    - sets the map state with the proper top view room map array to display where the current part is

        ```JSX
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
        ```
- roomDesc
    - parses out different parts of the current locationID that is stored in the currentID state and generates a description of where the part is stored in the lab * *warning: lots of if-else statements* *

        ```JSX
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
        ```

Returns
- [Table.js](#tablejs) component

    ```JSX
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
    ```
- [Pagination.js](#paginationjs) component

    ```JSX
        <Pagination 
            setCurrentPage={setCurrentPage}
            recordsPerPage={recordsPerPage}
            setRecordsPerPage={setRecordsPerPage} 
            totalRecords={totalRecords.current} 
        />
    ```
- div that displays the map results (visible when showOnMap state is true)
    - "DONE" button
        - onClick sets showOnMap to false and calls getParts to get other results back
    - heading that reads "TOP VIEW"
    - heading that displays the currentID state's locationID and the room description generated from the roomDesc function
    - roomElements array of [Box.js](#boxjs) components
    - heading that reads "TOP VIEW"
    - "DONE" button
        - onClick sets showOnMap to false and calls getParts to get other results back

### ___Table.js___

Props
- getParts
- partList
- setPartList
- showLoan
- toggleMapResult
- idList
- checkedState
- checkboxHandler
- query

Functions
- updateParts
    - Parameters
        - updateField - the field to update for the record
        - newVal - the new value to be applied to the updateField for the appropriate records
        - id - the partID of the record to be updated
    - function that uses Axios to call our PUT endpoint to update the value of a record under a specific field in the database
        ```JSX
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
        ```
- updateMultipleParts
    - Parameters
        - updateField - the field to update for the record
        - newVal - the new value to be applied to the updateField for the appropriate records
    - calls updateParts for every element in the idList (every element that has been checked under the "Selector" column)
        ```JSX
            const updateMultipleParts = (updateField, newVal) => {
                for(let i = 0; i < idList.length; i++){
                  updateParts(updateField,newVal,idList[i])
                }
            }
        ```
- onFind
    - when the magnifying glass icon under the "Show on map" column is clicked 

Returns
- table
    - First row of table defines the table headers
        ```JSX
            <tr id='pheader'>
                <th>Selector</th> //contains checkboxes
                <th>Barcode</th>
                <th>Name</th>
                <th>Location ID</th>
                <th>Show on MAP</th> //contains maginfying glass images
                <th>Project</th>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Serial Number</th>
                <th>Notes</th>
                <th>Custom Attributes</th>
                {showLoan && <th>On Loan</th>} //On Loan column only visible if showLoan state is true
            </tr>
        ```
    - Rows full of data are represented by the [PartRow.js](#partrowjs) component
        ```JSX
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
        ```

### ___Pagination.js___

Props
- setCurrentPage
- recordsPerPage
- setRecordsPerPage
- totalRecords

Variables
- pageNumbers
    - array that stores every page number for results
    - values are set using for loop that pushes the index value (starting with 1) to the array all the way up to the value of (totalRecords / recordsPerPage)
    ```JSX
        const pageNumbers = []

        for(let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++){
            pageNumbers.push(i)
        }
    ```

Functions
- paginate
    - when the user clicks a page number in pagination navbar the currentPage state is changed to the page requested
        ```JavaScript
            const paginate = (pageNumber) => {
                setCurrentPage(pageNumber)
            }
        ```
Returns
- navbar
    - "a" tags that contain the page number
        - onClick calls paginate to display the records on the newly clicked page in the table
- "Results per page" heading
- buttons labeled with amount of results to display on one page of the table (visible when there are more than one pages)
    - onClick sets recordsPerPage (declared in [Result.js](#resultjs)) to the amount specified on the button using the setRecordsPerPage prop

### ___PartRow.js___

Props
- partList
- updateParts
- onFind
- showLoan
- updateMultipleParts
- checkedState
- checkboxHandler
- query

Returns
- Map of partList as td tag and [TableData.js](#tabledatajs) components for each object in partList
    - td for "Selector" column
        -checkbox onChange calls checkboxHandler (defined in [Searchbar.js](#searchbarjs))
        - derives a checked value from the checkedState prop as defined in [Searchbar.js](#searchbarjs)
        ```JSX
            <td>
                    <input type='checkbox' id='selector' name='selector' value={item.partID} checked={checkedState[index]} onChange={(e)=>{checkboxHandler(index, e.target.checked, e.target.value)}}/>
            </td>
        ```
    - [TableData.js](#tabledatajs) components for barcode, name, locationID, project, manufacturer, model, serial number, notes, custom attributes, and on loan 
        - component for name includes the query prop as a parameter which will be discussed in [TableData.js](#tabledatajs)
        - component for onLoan is only rendered when showLoan prop is true
        ```JSX
            <TableData
                item = {item.barcode}//sub barcode for name, locationID, project...
                id = {item.partID}
                field = "barcode"
                updateParts = {updateParts}
                updateMultipleParts={updateMultipleParts}
            />
        ```
    - td for "Show on MAP" column
        - img onClick calls onFind (defined in [Table.js](#tablejs)) for the object to filter partList to only the current item and to display the map of the item's location
        ```JSX
            <td>
                <img 
                    src={searchIcon} 
                    alt='SHOW' 
                    style={{width: '20px', cursor: 'pointer'}}
                    onClick={()=>{onFind(item)}}
                />
            </td>
        ```

### ___TableData.js___

Props
- item
- field
- id
- updateParts
- query
- updateMultipleParts

States
- editCell
    - determines what stage of editing cells the user is at
        - editCell1 (stage 1) - data is displayed as expected
        - editCell2 (stage 2) - an edit icon is displayed below data when mouse hovers over cell
        - editCell3 (stage 3) - an update button, an "x", and an input box appear to modify data when the edit icon from stage 2 is clicked

Variables
- highlightedItem
    - contains the part name but displays the substring that matches the "Search by name..." search bar query as highlioghted
    ```JSX
        let highlightedItem = item

        if(field === 'name' && query !== ''){
            const regex = new RegExp(`(${query})`, "gi");
            
            //splits item based on the string matching regex (query)
            const parts = highlightedItem.split(regex)
    
            highlightedItem = (<span>
                    {parts.filter(String).map((part,key) => {//key is auto incrementing number
                        return regex.test(part) ? 
                            (<mark style={{background: '#E1AD01'}}key={key}>{part}</mark>) : 
                            (<span key={key}>{part}</span>);//if segment of parts contains regex we highlight, else we leave it be
                    })}
                </span>)
        }
    ```

useRef
- newValue
    - the new cell value to be pushed to the database
- customAttributesDisplay
    - translates JSON object to js object variable and then displays the custom attribute as a heading and paragraph
    ```JSX
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
    ```

Functions
- cellHoverOn & cellHoverOff
    - when hovering over a cell that is in stage 1, the cell is moved to stage 2
    ```JSX
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
    ```
- updateButtonClick
    - when the update button at stage 3 is clicked the updateParts & updateMultipleParts functions are called and editCell is set to stage 1 again
    ```JSX
        const updateButtonClick = () => {
            updateParts(field, newValue.current, id);//updates the current cell whether it is checked or not
            updateMultipleParts(field, newValue.current); //updates any checked cells
            setEditCell('editCell1');//sets editCell state to first stage
        }
    ```

Returns
- td
    - at stage 1 the value is displayed in the cell or if the value does not exist "-" is displayed
    ```JSX
        {editCell !== 'editCell3' && field !== 'name' && field !== 'onLoan' && (field !== 'customAttributes' || item === null || item === undefined || item === '{}') && 
            <p>{(item === ''||item === null || item === undefined || item === '{}')?'-':item}</p>//displays "-" when no attribute, or displays the item
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
    ```
    - at stage 2, all of the things displayed at stage 1 are visible in addition to the edit icon
    ```JSX
        {editCell === 'editCell2' && 
            <img 
                style={{width: '20px', cursor: 'pointer'}} 
                src={editIcon} 
                alt="EDIT" 
                onClick={() => {setEditCell('editCell3');}}
            />//displays editCell stage 2 edit icon 
        }
    ```
    - at stage 3, the input box, the update button, and the "x" are visible, the input boxes default value is the current value of item
    ```JSX
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
    ```

# Add

[Table of Contents](#table-of-contents)

## User:

When the user clicks "Add Part" in the top right of the navbar the display switches to an add part icon and three buttons that allow the user to choose a method to add a part. The options are to add via form, map, or csv. 

When the user clicks "FORM" a form appears where the user can enter values. On loan defaults to "NO" and to add a custom attribute the user must type a key and a value and then click "ADD ATTR" if the user wishes to discard the custom attributes they can click "CLEAR ATTRS." The user can add the new part by clicking the large green "ADD PART" button. If the user does not fill out the name or locationID field a red error message will appear above the form and the values will persist in their respective input boxes. If the user successfully fills out the form "success" will appear in green and the values will be cleared from the input fields. Both the error and success messages can be cleared by clicking the "OK" button next to the message.

When the user clicks "MAP" the map from Map Search appears for the user to select the location the part is to be stored at. Then the form from the add part "FORM" option will appear for the user to input the rest of the part attributes with the location already filled out.

When the user clicks "CSV" a link to download a part csv template, a drop box, and a button appear. The user simply has to upload their csv file to the drop box and then click "Import CSV" to upload the parts on the file to the database. Upon clicking "Import CSV" an error or success message will appear the same way as when an add part form is submitted. If the CSV file has more than 1000 rows there could be a browser resource issue where there are not enough workers or thread to fulfill the request. To account for this, if the user uploads a CSV file with too many rows the app will not upload the file but rather provide the user with alternate solutions such as to break the file into smaller ones or use a browser that manages resources better like firefox. If the user clicks "proceed anyway" the parts in the CSV file will be uploaded anyway (if the user clicks this hopefully they are using firefox).

## Code:

### ___AddPart.js___

Props
- part
- setPart
- locationList

States
- addMode
    - determines which mode the user will add parts by
- errorList
    - an array of error message objects and strings or used to store the value "success" when no errors occur

Variables
- errors
    - a map of the errorList to display and stylize the list of errors well
    ```JSX
        let errors = errorList.map((er, k)=>(
            <p key={k} style={{color: 'red'}}>{er.errno} {er.code}: {er.message}</p>
        ))
    ```

Functions
- addModeButtonHandler
    - sets the addMode state based on the value of the mode button clicked
    ```JSX
        const addModeButtonHandler = (e) => {
            setAddMode(e.target.value)
        }
    ```
- clearErrorList
    - clears the errorList state
    ```JSX
        const clearErrorList = () => {
            setErrorList([])
        }
    ``` 

Returns
- addMode buttons
    - onClick calls addModeButtonHandler
    - allows the user to change how they will add a part
- errors variable & "OK" button
    - errorList mapped to the errors variable is visible if the first position of the errorList is not "success" and if the errorList is not empty
    - onClick of "OK" button calls clearErrorList
- "success" & "OK" button
    - visible if first position of errorList is "success"
    - onClick of "OK" button calls clearErrorList
- [AddForm.js](#addformjs) component
    - visible if addMode is "form" or "hide map"
    ```JSX
        <AddForm 
            part={part}
            setPart={setPart}
            locationList={locationList}
            setErrorList={setErrorList}
            clearErrorList={clearErrorList}
        />
    ```
- [MapSelection.js](#mapselectionjs) component
    - visible if addMode is "map"
    ```JSX
        <MapSelection 
            setPart={setPart}
            setMapDisplay={setAddMode}
        />  
    ```
- [AddCSV.js](#addcsvjs) component
    - visible if addMode is "csv"
    ```JSX
        <AddCSV
            errorList={errorList}
            setErrorList={setErrorList}
            clearErrorList={clearErrorList}
        />
    ```

### ___AddForm.js___

Props
- part
- setPart
- locationList
- setErrorList
- clearErrorList

Refs
- customAttributes ({})
    - object that contains the key value pairs of all custom attributes for the specified part
- custAttrKeys ([])
    - stores the keys of each customAttribute in the order they were added if the user would like to delete them
States
- customAttributesDisplay
    - state to display the customAttributes ref in a neat manner
    ```JSX
        const [customAttributesDisplay, setCustomAttributesDisplay] = useState(
            Object.keys(customAttributes.current).map((k,key)=>(
                <p key={key}>{k}: {customAttributes.current[k]}</p>
            ))
        )
    ```

Functions
- addPart
    - adds a part to the database using the POST server endpoint
    ```JSX
        const addPart = () => {

          //formats the custom attributes to be added to MySQL db as a JSON object
          let custAttrs = '{'+
              Object.keys(customAttributes.current).map((key)=>(
                  '"'+key+'": "'+customAttributes.current[key]+'"'
              ))+'}'

              Axios.post('http://localhost:3001/addPart', 
              {
                barcode: part.barcode, 
                name: part.name, 
                locationID: part.locationID, 
                project: part.project, 
                manufacturer: part.manufacturer, 
                model: part.model, 
                serialNum: part.serialNum, 
                notes: part.notes,
                onLoan: part.onLoan,
                customAttributes: custAttrs
              }
              ).then((response)=>{
                
                if(response.data.sqlMessage !== undefined){
                  setErrorList((prev)=>[...prev, {errno: response.data.errno, code: response.data.code, message: response.data.sqlMessage}]);
                }
                else{
                  setErrorList(['success'])

                  //resets the part & custom attributes
                  setPart({barcode:"", name: '', locationID:'', project:'', manufacturer:'', model:'', serialNum:'', notes:'', onLoan: 0, customAttributes:''})

                  //resets customAttribute object and display
                  customAttributes.current = {}
                  setCustomAttributesDisplay([])
                }

              })
        }
      ```
- partSetter Params: (Event object)
    - modifies the part state's attribute (defined in [App.js](#appjs)) that corresponds with the name of the input box to the current value in the input box
    ```JSX
        const partSetter = (event) => {
            setPart(prev => {return{...prev, [event.target.name]:event.target.value}})// [] uses the event.target.name as the attribute name in part
        }
    ``` 
- addCustomAttribute
    - adds a new custom attribute to the customAttributes state in a similar way to partSetter
    ```JSX
        const addCustomAttribute = () =>{
            //adds new key value pair to the customAttributes object
            customAttributes.current[document.getElementById('key').value] = document.getElementById('value').value

            //pushes the key from the new pair to an array to track order they were added
            custAttrKeys.current.push(document.getElementById('key').value)

            //clears the text input boxes so user can enter another key value
            document.getElementById('key').value = ''
            document.getElementById('value').value = ''

            //updates the display for the user to see
            setCustomAttributesDisplay(
                Object.keys(customAttributes.current).map((k,key)=>(
                    <p key={key}>{k}: {customAttributes.current[k]}</p>
                ))
            )
        }
    ```
- clearCustomAttributes
    - removes the most recent custom attribute key value pair added
    ```JSX
        const clearCustomAttributes = () => {
            //pops the most recent element in the array of custom attribute keys, deletes that item from the customAttributes object
            delete customAttributes.current[custAttrKeys.current.pop()]

            //updates the display state
            setCustomAttributesDisplay(
                Object.keys(customAttributes.current).map((k,key)=>(
                    <p key={key}>{k}: {customAttributes.current[k]}</p>
                ))
            )
        }
    ```
- addPartClick
    - adds part to db and handles other housekeeping 
    ```JSX
        const addPartClick = () => {
            addCustomAttribute()//adds the current text input for key value pairs in case user never clicked "ADD Another ATTR"

            clearErrorList()

            addPart()
        }
    ```

Returns
- input for 
- Input text boxes for barcode, name, project, manufacturer, model, serial number, and notes
    - onChange calls partSetter
- Datalist textbox for locationID - List contains options that are mapped from the locationList prop and is filtered as the user types into the textbox.
    - onChange calls partSetter
    ```JSX
        <div className="col form-floating mb-3">
            <input className="form-control" list="datalistOptions" name="locationID" value={part.locationID} type='text' placeholder="Location ID" onChange={(e)=>partSetter(e)}/>
            <datalist id="datalistOptions">
                {locationList.map((i) => {return(<option value={i.locationID} key={i.locationID}>{i.locationID}</option>)})}
            </datalist>
            <label className="form-label">LOCATION ID <span style={{color: 'red'}}>*</span></label>
        </div>
    ```
- "onLoan" radio boxes
    - onChange calls partSetter
    - "No" is defaultChecked
    ```JSX
        <div className="col mb-3">
            <label>ON LOAN?</label>
            <div className="d-flex justify-content-evenly">
                <div className="form-check">
                    <input className="form-check-input" type="radio" value={1} name="onLoan" onChange={(e)=>partSetter(e)}/>
                    <label>YES</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" value={0} name="onLoan" defaultChecked onChange={(e)=>partSetter(e)}/>
                    <label>NO</label>
                </div>
            </div>
        </div>
    ```
- Custom attribute key and value text inputs
- "ADD Another ATTR" button
    - onClick calls addCustomAttribute
- "CLEAR Recent ATTR" button
    - onClick calls clearCustomAttributes
- customAttributesDisplay (visible if custom attributes exist)
- "ADD PART" button
    - onClick calls addPartClick

### ___AddCSV.js___

Props
- errorList
- setErrorList
- clearErrorList

States
- file
    - holds the file the user uploads
- show1000Message (boolean)
    - determines whether or not to show warning message when there are more than 1000 parts in the csv

Functions
- handleOnChange Params: (Event object)
    - sets the file state to the currently uploaded file
    ```JSX
        const handleOnChange = (e) => {
            setFile(e.target.files[0])
        }
    ```
- handleOnSubmit
    - Paramters
        - Event object
        - Proceed - boolean that is sent from where handleOnSubmit is called from, if user clicks proceed after a warning this value will be true, otherwise handleOnSubmit via the Import CSV file will send a false value
    - reads the file state as text using fileReader, uses the papaparse library to parse the csv file, then the importToDB function is called if there are no warnings regarding too many rows in a file
    ```JSX
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
                    setErrorMsg1000('It is likely that your browser resources can not safely support this upload, either use Firefox or smaller files.')
                  }
                  else{
                    importToDB(csvData.data)
                  }
                }
                //https://developer.mozilla.org/en-US/docs/Web/API/FileReader
                fileReader.readAsText(file)//use fileReader on file state this will trigger fileReader.onload (20ish lines above here)
              }
            }
    ```
- importToDB
    - Parameters
        - csvData - the parsed csv data from the handleOnSubmit function as an array
    - calls addPartByCSV for each element in the csvData array, every attribute is included as a paramteter
    ```JSX
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
    ``` 
- addPartByCSV
    - Parameters
        - b - part barcode 
        - na - part name 
        - l - part locationID 
        - p - part project 
        - ma - part manufacturer 
        - mo - part model 
        - s - part serialNum 
        - no - part notes
        - ol - part onLoan
        - ca - part customAttributes
    - Works the same as addPart in [AddForm.js](#addformjs) 
    ```JSX
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
    ```
Returns
- Link to download a template csv file
- file input that accepts only CSVs
    - onChange calls handleOnChange
- "Import CSV" button
    - onClick calls handleOnSubmit (proceed false)
- error message and "proceed anyway" button (visible when show1000Message is true)
    - button onClick calls handleOnSubmit (proceed true)
    ```JSX
        {show1000Message === true && <div>
            <h3 style={{color: 'red'}}>It is likely that your browser resources can not safely support this upload, either use Firefox or smaller files.</h3>

            <button
                className="btn btn-danger"
                onClick={(e)=>{handleOnSubmit(e, true)}}
            >Proceed Anyway</button>
        </div>}
    ```

# Server

## Node.js

JavaScript runtime environment that allows JavaScript to be run outside of the context of a web browser. Node.js is designed for server side use and can process new requests as soon as it sends the previous request out. 

## Express

## CORS

### ___Server.js___

Modules
- Express
    - Node.js framework. Very flexible and minimalist, often used to create simple servers that serve as web endpoints
- MySQL
    - Software that supports creating and maintaining databases

Middleware
- Express.JSON
    - Allows app to receive request objects from clients as json objects
- Cross-origin resource sharing (CORS)
    - Express middleware that allows loading information from different web origins (domains, schemes, ports) while protecting from man-in-the-middle attacks where someone poses as the origin the site requests data from.

Database Connection
- The database and user that our app will connect to
```JavaScript
    const db = mysql.createConnection({
        user: "root",
        host: "localhost",
        password: "Password1",
        database: "inventory_tool",
    });
```
Endpoints
- App.post
    - Routes
        - addPart
            - Receives parameters from client's request object and inserts them into DB using db.query. "?"s prevent SQL injection
            ```JavaScript
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

                if(customAttributes === ''){//when there are no custom attributes to insert
                    db.query('INSERT INTO parts (barcode, name, locationID, project, manufacturer, model, serialNum, notes, onLoan) VALUES (?,?,?,?,?,?,?,?,?);', 
                    [barcode, name, locationID, project, manufacturer, model, serialNum, notes, onLoan], 
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
                else{//when there are custom attributes to insert
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
            ```
- App.get
    - Routes
        - getParts
            - Uses a LIKE clause to filter parts based on their attribute values matching our request parameters
            ```JavaScript
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
            ```
        - getLocations
            - Selects all of the locations without any filters
            ```JavaScript
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
            ```
- App.put
    - Routes
        - updateParts
            - for a specifiied part (specified with id) and field, the parts current value in the specified field is replaced with this new value
            ```JavaScript
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
            ```
- App.delete
    - Routes
        - deleteParts
            - deletes the part from the parts table that matches the id sent in the parameters
            ```JavaScript
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
            ```


# MySQL Database: inventory_tool

When creating the db make sure the database name (never capitalize db name) and user's password in your MySQL Workbench match the information in the code in [Server.js](#serverjs)

```JavaScript
    const db = mysql.createConnection({
        user: "root",
        host: "localhost",
        password: "Password1",
        database: "inventory_tool",
    });
```

Tables
- locations
    - locationID (varchar(11)) - primary key
- parts
    - partID - auto-incrementing primary key
    - barcode (varchar(45))
    - name (varchar(45))
    - locationID (varchar(11)) - foreign key, references locationID in locations
    - project (varchar(45))
    - manufacturer (varchar(45))
    - model (varchar(45))
    - serialNum (varchar(45))
    - notes (varchar(300))
    - onLoan (boolean/tinyint)
    - customAttributes (JSON)

*sql table backup files are featured on the GitHub page to quickly set up the database*

# Known Bugs

- Sometimes pagination does not work
    - I believe I fixed it by updating the href value of the "a" tag in [Pagination.js](#paginationjs) but keep an eye on it 

# Fixed bugs

- On occasion when adding part via form error message "onLoan can not be null" appears
    - Fixed by adding line of code to server.js where if the onLoan value is null the database knows that the part is not on loan

# Features to modify

- For navigation in [MapSelection.js](#mapselectionjs) change confirm button to a back button and advance stages by only clicking desired box
- Clicking IDATS logo brings you to home page
- User instructions on "Help" button click in the navbar in [Header.js](#headerjs)
