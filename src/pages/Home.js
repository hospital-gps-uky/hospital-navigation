import React, { useState, useEffect } from 'react';
import './App.css';
import api from './api.js';

import LocationCard from '../components/LocationCard.js';
import MainHeader from '../components/MainHeader.js';

function Home() {


  
  let [cardData, setCardData] = useState();

    useEffect(() => {
        // api.login('nddada', 'addadaad').then(result => console.log(result));
        api.getLocationsByType('start').then(result => setCardData(result));
    },[]);

    return (
        <div className='Homepage'>
            <MainHeader />
            <div>
                <h3 className="chooseStart">Select which entrance you used</h3>

                <LocationCard data={cardData} start=""/>

            </div>
		</div>
    )
}

export default Home;