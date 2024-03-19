import React, { useState, useEffect, useRef } from 'react';
import './MapPage.css';
import MapButton from '../components/MapButton';
import MainHeader from '../components/MainHeader';
import { graphql } from 'gatsby';
import { find_path } from 'dijkstrajs';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer'; // Import MapPlugin here
import { MapPlugin } from '@photo-sphere-viewer/map-plugin';
 
function RouteElement({path, currentIndex}) {
    let locations = []

    path.forEach((location, index) => {
        let thisItemBold = false;

        if (currentIndex === index) { // on active location
            thisItemBold = true; // make this element bold
        }

        // puts a div with location text and a div with just an arrow into locations array
        locations.push(<div key={location} className={`navitem ${thisItemBold ? "bold-location" : ""}`}>{location}</div>)
        locations.push(<div key={location + "Arrow"} className='nav-item'>&nbsp; → &nbsp;</div>) 
    });

    if (locations.length > 0)
        locations.pop() // remove last arrow

    // return constucted array of divs
    return (
        <div className='nav-route'>
            {locations}
        </div>
    )
}

function calculateWeight(location1, location2){
    const deltaX = location1.x - location2.x;
    const deltaY = location1.y - location2.y;

    return Math.sqrt(deltaX ** 2 + deltaY ** 2);

}

// Take an array of edges, calculate weights, and create graph.
function createGraph(edges) {
    let graph = {};
    edges.map((edge) => {
        const weight = calculateWeight(edge.node.location1, edge.node.location2);
        // location1.name: {location2.name: weight}
        graph[edge.node.location1.name] = {[edge.node.location2.name]: weight}
    });
    return graph;
}

const MapPage = ({ data, location } ) => {
    const photoSphereRef = React.createRef();

    const maps = data.allSanityMap.nodes; // Use this to access an array of the maps.

    let start = location.state.startName;
    let end = location.state.endName;

    let [currentIndex, setCurrentIndex] = useState(0); // The current index into the path array
    let [path, setPath] = useState([]);

    // Create path
    useEffect(() => {
        if (start === undefined || end === undefined) {
            setPath([]);
            setCurrentIndex(0);
            return;
        }
        
        const edges = data.allSanityEdge.edges;
        const graph = createGraph(edges);
        setPath(find_path(graph, start, end))
        setCurrentIndex(0);
    }, [start, end]);

    // Update image.
    useEffect(() => {
        if (path.length <= 0) return;
        const newCurrentLocation = data.allSanityLocation.edges.find(location => location.node.name === path[currentIndex]).node;
        photoSphereRef.current.setPanorama(newCurrentLocation.image3D.asset.publicUrl);
    }, [path, currentIndex]);

    function nextLocation() {
        if (currentIndex < path.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }
    console.log("Hello" + maps);
    return (
        <div className='MapPage'>
            <MainHeader />
            <div className="controlBox">
                <MapButton link=".." displayText="New Entrance" />
                <MapButton link={"../" + start} displayText="New Destination" />
                <div className="destBox">
                    <div className="buttonDiv">
                        <button className="customButton" onClick={nextLocation}>
                            Next Image
                        </button>
                    </div>
                </div>
            </div>


            <div className="mapContainer">
                <RouteElement path={path} currentIndex={currentIndex} className="navRoute"/>
                <ReactPhotoSphereViewer
                    ref={photoSphereRef}
                    height={'100vh'}
                    width={"100%"}
                    plugins={[
                        [MapPlugin, { // Configure MapPlugin here
                            imageUrl: maps[0].image.asset.publicUrl,
                            center: { x: 0, y: 0 }, // Adjust the center coordinates as needed
                            rotation: '-12deg', // Adjust rotation as needed
                        }]
                    ]}
                ></ReactPhotoSphereViewer>
                <div className="miniMapContainer">
                    {/*<MiniMap path={path} currentIndex={currentIndex} />*/}
                </div>
            </div>
        </div>
    );
}

export const query = graphql`
query MyQuery {
    allSanityMap {
        nodes {
          floor
          image {
            asset {
              publicUrl
            }
          }
        }
      }
    allSanityEdge {
      edges {
        node {
          location1 {
            name
            floor
            x
            y
            type
          }
          location2 {
            name
            type
            x
            y
            floor
          }
        }
      }
    }
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
                publicUrl
              }
            }
            image3D {
              asset {
                publicUrl
              }
            }
          }
        }
      }
  }`

export default MapPage;
