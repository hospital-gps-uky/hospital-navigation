import React from 'react';
import './LocationCard.css';
import { GatsbyImage} from 'gatsby-plugin-image'
import { motion } from 'framer-motion';

import placeHolder from '../images/1st Floor Main Entrance.png';

const LocationCard = (location) => {

    return (
    <motion.div initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}>
        <div className="card container">
                <GatsbyImage 
                    image={location.data.node.image2D ? location.data.node.image2D.asset.gatsbyImageData : placeHolder} 
                    alt={location.data.node.name}
                    style={{maxHeight: '250px'}}/>

                <div className="column">
                    <p className="locationName">{location.data.node.name}</p>
                </div>
        
        </div>
    </motion.div>
    )

}

export default LocationCard

