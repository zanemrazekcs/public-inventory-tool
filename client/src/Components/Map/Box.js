import React from "react"

export default function Box(props) {
    const {key, on, text, gridArea, toggle, height, width} = props

    const styles = {
        backgroundColor: on ? "#00FF00" : "transparent",
        gridArea: gridArea,
        height: height,
        width: width
    }
    
    return (
        <div 
            key={key}
            className="box" 
            style={styles}
            onClick={toggle}
        >
            <p>{text}</p>
        </div>
    )
}