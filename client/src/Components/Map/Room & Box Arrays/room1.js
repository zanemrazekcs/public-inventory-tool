const room1 = [
    {
        id: 'R1:FLU:CBN1',
        id2: 'R1:FLL:CBN1',
        id3: 'R1:FLM:DRW1',
        on: false,
        text: 'cabinets/drawer',
        gridArea: '16 / 2 / span 1 / span 1',
        size: '75px'
    },
    {
        id: 'R1:FLU:CBN2',
        id2: 'R1:FLL:CBN2',
        id3: 'R1:FLM:DRW1',
        on: false,
        text: 'cabinets/drawer',
        gridArea: '15 / 2 / span 1 / span 1',
    },
    {
        id: 'R1:FLU:CBN3',
        id2: 'R1:FLM:DRW2',
        on: false,
        text: 'cabinet/drawer',
        gridArea: '14 / 2 / span 1 / span 1',
    },
    {
        id: 'R1:FLU:CBN4',
        id2: 'R1:FLM:DRW2',
        on: false,
        text: 'cabinet/drawer',
        gridArea: '13 / 2 / span 1 / span 1',
    },
    {
        id: 'R1:FLU:CBN5',
        id2: 'R1:FLL:CBN3',
        on: false,
        text: 'cabinets',
        gridArea: '12 / 2 / span 1 / span 1',
    },
    {
        id: 'R1:FLU:CBN6',
        id2: 'R1:FLL:CBN4',
        on: false,
        text: 'cabinets',
        gridArea: '11 / 2 / span 1 / span 1',
    },
    {//cart
        id: 'R1:MLM:CRT1',
        id2: 'R1:MLL:CRT1',
        on: false,
        text: 'cart',
        gridArea: '10 / 2 / span 1 / span 1',
    },
    {
        id: 'R1:BLU:CBN7',
        id2: 'R1:MLL:DRW3',
        id3: 'R1:MLL:DRW4',
        on: false,
        text: 'cabinet/drawers',
        gridArea: '8 / 1 / span 1 / span 1',
    },
    {
        id: 'R1:BLU:CBN8',
        id2: 'R1:BLL:CBN5',
        on: false,
        text: 'cabinets',
        gridArea: '7 / 1 / span 1 / span 1',
    },
    {
        id: 'R1:BLU:CBN9',
        id2: 'R1:BLL:CBN6',
        on: false,
        text: 'cabinets',
        gridArea: '6 / 1 / span 1 / span 1',
    },
    {
        id: 'R1:BLU:CBN0',
        id2: 'R1:BLL:CHM1',
        on: false,
        text: 'cabinet/chemical storage',
        gridArea: '5 / 1 / span 1 / span 1',
    },
    {
        id: 'R1:BLL:CBN7',
        on: false,
        text: 'cabinet',
        gridArea: '5 / 1 / span 1 / span 1',
    },
    {//FLOOOOOOOOOOOOOOOOOOOOOOOR---------------------------
        id: 'R1:BLL:FLR1',
        on: false,
        text: 'floor',
        gridArea: '1 / 1 / span 4 / span 1',
    },
    //front
    {
        id: 'R1:FLM:TLC1',
        id2: 'R1:FLL:TLC1',
        on: false,
        text: 'tool chest',
        gridArea: '16 / 3 / span 1 / span 1',
        width: '150px'
    },

    {
        id: 'R1:DOOR1',
        on: false,
        text: 'door to outside lab',
        gridArea: '16 / 4 / span 1 / span 2',
        width: '150px'
    },
    {
        id: 'R1:DOOR2',
        on: false,
        text: 'door to room 2',
        gridArea: '1 / 3 / span 1 / span 2',
        width: '150px'
    },

    {//WorkBench---------------------------
        id: 'R1:MML:WKB1',
        on: false,
        text: 'workbench',
        gridArea: '5 / 4 / span 4 / span 2',//2->1
        width: '100px'
    },
    {//FAR RIGHT SET OF CABINETS-------------------------------------
        id: 'R1:FRU:CBN2',
        id2: 'R1:FRL:CBN4',
        id3: 'R1:FRM:DRW7',
        on: false,
        text: 'cabinets/drawer',
        gridArea: '16 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:FRU:CBN1',
        id2: 'R1:FRL:CBN3',
        id3: 'R1:FRM:DRW7',
        on: false,
        text: 'cabinets/drawer',
        gridArea: '15 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:FRU:CBN0',
        id2: 'R1:FRM:DRW6',
        on: false,
        text: 'cabinet',
        gridArea: '14 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:FRU:CBN9',
        id2: 'R1:FRM:DRW6',
        on: false,
        text: 'cabinet/drawer',
        gridArea: '13 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:FRU:CBN8',
        id2: 'R1:FRL:CBN2',
        on: false,
        text: 'cabinet',
        gridArea: '12 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:FRU:CBN7',
        id2: 'R1:FRL:CBN1',
        on: false,
        text: 'cabinets',
        gridArea: '11 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:MRU:SHL2',
        id2: 'R1:MRL:DRW7',
        id3: 'R1:MRL:DRW8',
        on: false,
        text: 'shelf/drawers',
        gridArea: '10 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:MRU:SHL2',
        id2: 'R1:MRL:DRW6',
        on: false,
        text: 'shelf/drawer',
        gridArea: '9 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:MRU:CBN6',
        id2: 'R1:MRL:DRW3',
        id3: 'R1:MRL:DRW4',
        id4: 'R1:MRL:DRW5',
        on: false,
        text: 'cabinet/drawers',
        gridArea: '8 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:MRU:CBN5',
        id2: 'R1:MRL:DRW1',
        id3: 'R1:MRL:DRW2',
        on: false,
        text: 'cabinet/drawers',
        gridArea: '7 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:BRU:CBN4',
        id2: 'R1:BRL:DRW0',
        on: false,
        text: 'cabinet/drawer',
        gridArea: '6 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:BRU:CBN3',
        id2: 'R1:BRL:DRW0',
        on: false,
        text: 'cabinet/drawer',
        gridArea: '5 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:BRU:CBN2',
        id2: 'R1:BRL:DRW7',
        id3: 'R1:BRL:DRW8',
        id4: 'R1:BRL:DRW9',
        on: false,
        text: 'cabinet/drawers',
        gridArea: '4 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:BRU:CBN1',
        id2: 'R1:BRL:DRW5',
        id3: 'R1:BRL:DRW6',
        on: false,
        text: 'cabinet/drawers',
        gridArea: '3 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:BRU:SHL1',
        id2: 'R1:BRL:DRW4',
        on: false,
        text: 'shelf/drawer',
        gridArea: '2 / 6 / span 1 / span 1',
    },
    {
        id: 'R1:BRU:SHL1',
        id2: 'R1:BRL:DRW1',
        id3: 'R1:BRL:DRW2',
        id4: 'R1:BRL:DRW3',
        on: false,
        text: 'shelf/drawers',
        gridArea: '1 / 6 / span 1 / span 1',
    },
    //back------------
    {
        id: 'R1:BRM:CBN1',
        id2: 'R1:BRM:CBN2',
        on: false,
        text: 'tall cabinet',
        gridArea: '1 / 4 / span 1 / span 1',
    },
    {
        id: 'R1:BRM:CBN3',
        on: false,
        text: 'yellow cabinet',
        gridArea: '1 / 5 / span 1 / span 1',
    },

    
]

export default room1