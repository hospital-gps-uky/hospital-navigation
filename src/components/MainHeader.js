import React from 'react';
import './MainHeader.css';
import UKlogo from "../images/UKlogo-white.png";

function MainHeader() {

   return (
        <header className='Header'>
            
            <img src={UKlogo}  alt="UKlogo.png" className='UKLogo'/>

            <div className="Header-links-div">
                <a className="Header-link" href="https://ukhealthcare.uky.edu"
                    target="_blank" rel="noopener noreferrer" >
                UK HEALTHCARE
                </a>
            </div>
        </header>
    )
}

export default MainHeader