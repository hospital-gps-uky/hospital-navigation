import React from 'react';
import { graphql } from 'gatsby'

import MainHeader from '../components/MainHeader';
import LocationCard from '../components/LocationCard';
import './ChooseEnd.css'
import { Link } from "gatsby"

const ChooseEnd = ({ data, location } ) => {
    let startName = location.state.startName;
    const allSanityEndLocations = data.allSanityLocation.edges.filter((location) => location.node.type === "end")

    return (
        <div className='ChooseEnd'>
            <MainHeader />
            <div className='container'>
                <h3 className="choose-end">Start location: {startName}</h3>
                <h4 className="choose-end">Select what destination you are going to</h4>

                {allSanityEndLocations.map((node) => (
                    <Link to={`/MapPage/`} state={{endName: node.node.name, startName: startName}}>
                        <LocationCard data={node} start=""/>
                    </Link>
                ))}

            </div>
		</div>
    )
}  

export const query = graphql`
query MyQuery {
    allSanityLocation {
      edges {
        node {
          floor
          name
          type
          x
          y
          image2D {
            asset {
              gatsbyImageData
            }
          }
          image3D {
            asset {
              gatsbyImageData
            }
          }
        }
      }
    }
  }`

export default ChooseEnd;