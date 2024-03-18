import React from 'react';
import './App.css';
import { graphql } from 'gatsby'
import { Link } from "gatsby"

import LocationCard from '../components/LocationCard.js';
import MainHeader from '../components/MainHeader.js';

const IndexPage = ({data}) => {
    const allSanityStartLocations = data.allSanityLocation.edges.filter((location) => location.node.type === "start")

    return (
        <div className='Homepage'>
            <MainHeader />
            <div>
                <h3 className="chooseStart">Select which entrance you used</h3>
                {allSanityStartLocations.map((location) => (
                    <Link to={`/ChooseEnd/`} state={{startName: location.node.name}}>
                        <LocationCard data={location} start=""/>
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

export default IndexPage

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();