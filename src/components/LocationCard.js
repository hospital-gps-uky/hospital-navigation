import React from 'react';
import './LocationCard.css';
import { GatsbyImage} from 'gatsby-plugin-image'

import placeHolder from '../images/1st Floor Main Entrance.png';

const LocationCard = (location) => {

    return (
    <div className="card container">
                <GatsbyImage 
                    image={location.data.node.image2D ? location.data.node.image2D.asset.gatsbyImageData : null} 
                    style={{width: '100%'}} 
                    alt={location.data.node.name}/>

                <div className="column">
                        {location.data.node.name}
                        <span className='clickable-card'></span>
                </div>
    </div>
    )

}

export default LocationCard

