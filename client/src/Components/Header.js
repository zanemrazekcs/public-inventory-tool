import React from "react";
import IDATSLogo from '../Images/IDATSLogo.png'

export default function Header(props){
    const {headerButtonHandler} = props
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
            <img className="navbar-item float-end" style={{width:'100px'}}src={IDATSLogo} alt='IDATS Logo'/>

            <a href="#top" className="navbar-brand ms-3">IDATS Inventory Tool</a>
            
            <ul className="navbar-nav ms-auto">
                <li className="navbar-item m-1">
                    <button className='btn' value ='search' onClick={(e)=>headerButtonHandler(e)}>Search</button>
                </li>
                <li className="navbar-item m-1">
                    <button className='btn' value='add' onClick={(e)=>headerButtonHandler(e)}>Add Part</button>
                </li>
            </ul>
    </nav>
    )
}

/**
 * 
 * 

            <nav class="navbar navbar-light bg-light navbar-expand-lg fixed-top">
            <a href="#" class="navbar-brand">My Website</a>
            <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ms-auto">
                    <li class="navbar-item">
                        <a href="#" class="nav-link">Homepage</a>
                    </li>
                    <li class="navbar-item">
                        <a href="#" class="nav-link">Blog</a>
                    </li>
                    <li class="navbar-item">
                        <a href="#" class="nav-link">About Me</a>
                    </li>
                    <li class="navbar-item">
                        <a href="#" class="nav-link">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
 */