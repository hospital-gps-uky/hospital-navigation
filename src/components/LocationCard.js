import React from 'react';
import './LocationCard.css';
import { GatsbyImage } from 'gatsby-plugin-image'
import { StaticImage} from 'gatsby-plugin-image'
// import { SourceFilesystem} from 'gatsby-source-filesystem'
import { motion } from 'framer-motion';

// import placeHolder from '../images/1st Floor Main Entrance.png';

const LocationCard = (location) => {

    return (
        <motion.div initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}>
            {/* Check if 2D thumbnail image exists, if not, use a placeholder */}
            <div className="card container">
                {location.data.node.image2D ? (
                    <GatsbyImage
                        image={location.data.node.image2D.asset.gatsbyImageData}
                        alt={location.data.node.name}
                        style={{ maxHeight: '250px' }}
                    />

                ) : (
                    /* Note that this needs to have gatsby-source-filesystem
                     * installed for the placeholder image to be pulled */
                    <StaticImage
                        src="../images/1st Floor Main Entrance.png"
                        alt="Placeholder"
                        style={{ maxHeight: '250px' }}
                    />
                )}
                <div className="column">
                    <p className="locationName">{location.data.node.name}</p>
                </div>
            </div>
        </motion.div>
    )

}

export default LocationCard

