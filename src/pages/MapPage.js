import React, { useState, useEffect, useRef } from 'react';
import './MapPage.css';
import MapButton from '../components/MapButton';
import MainHeader from '../components/MainHeader';
import { GatsbyImage} from 'gatsby-plugin-image'
import { Link, graphql } from 'gatsby';

import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { DijkstraCalculator } from 'dijkstra-calculator';
import { GyroscopePlugin } from '@photo-sphere-viewer/gyroscope-plugin';
import { MapPlugin } from '@photo-sphere-viewer/map-plugin';
import '@photo-sphere-viewer/map-plugin/index.css';


 
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
function createGraph(locations, edges) {
    const graph = new DijkstraCalculator();

    locations.map((location) => {
        graph.addVertex(location.node.name);
    })

    edges.map((edge) => {
        const weight = calculateWeight(edge.node.location1, edge.node.location2);
        // location1.name: {location2.name: weight}
        graph.addEdge(edge.node.location1.name, edge.node.location2.name, weight);
    });
    return graph;
}

const MapPage = ({ data, location } ) => {

    const photoSphereRef = React.createRef();

    const maps = data.allSanityMap.nodes; // Use this to access an array of the maps.

    let [currentIndex, setCurrentIndex] = useState(0); // The current index into the path array
    let [path, setPath] = useState([]);
    let [reverse, setReverse] = useState(false);

    let start = null;
    let end = null;
    
    if(typeof location.state !== "undefined") {
        start = location.state.startName;
        end = location.state.endName;
    } 
        
    // Create path
    useEffect(() => {
        if (start === undefined || end === undefined) {
            setPath([]);
            setCurrentIndex(0);
            return;
        }
        
        const edges = data.allSanityEdge.edges;
        const locations = data.allSanityLocation.edges;
        const graph = createGraph(locations, edges);
        setPath(graph.calculateShortestPath(start, end));
        setCurrentIndex(0);
    }, [start, end]);

    // Update image.
    useEffect(() => {
        if (path.length <= 0 || !photoSphereRef.current) return;
        
        const newCurrentLocation = data.allSanityLocation.edges.find(location => location.node.name === path[currentIndex]).node;
        photoSphereRef.current.setPanorama(newCurrentLocation.image3D.asset.publicUrl, {transition: false, position: {yaw: reverse ? 3.2 : 0, pitch: 0}});
        
        // Calculate the angle towards the next location
        let angle = 0;
        if (currentIndex < path.length - 1) {
          const nextLocation = data.allSanityLocation.edges.find(location => location.node.name === path[currentIndex+1]).node;
          const deltaX = nextLocation.x - newCurrentLocation.x;
          const deltaY = nextLocation.y - newCurrentLocation.y;
          angle = Math.atan2(deltaY, deltaX);
      
          // Adjust the angle to be within the range of 0 to 6.28 (2 * Math.PI)
          angle = (angle >= 0 ? angle : (2 * Math.PI + angle)) + Math.PI/2;

              // Adjust the angle when going in reverse
            if (reverse) {
                angle -= Math.PI; // Subtract 180 degrees or π radians
            }
        }
        
      
        // Update center coordinates dynamically
        const center = { x: newCurrentLocation.x, y: newCurrentLocation.y };
      
        // Update floor based on image
        const currentFloor = newCurrentLocation.floor; // get current floor from current location
        const currentFloorMap = maps.find(map => map.floor === currentFloor); // find the map object that has the current floor
      
        // Create a new image object
        const mapImage = new Image();
        mapImage.src = currentFloorMap.image.asset.publicUrl;
      
        // Draw the map on canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        mapImage.onload = function() {
          canvas.width = mapImage.width;
          canvas.height = mapImage.height;
          context.drawImage(mapImage, 0, 0);
          
          // Draw the path on canvas
          context.strokeStyle = 'blue';
          context.lineWidth = 5;
          context.beginPath();
          context.moveTo(newCurrentLocation.x, newCurrentLocation.y);
          for (let i = currentIndex + 1; i < path.length; i++) {
            const nextLocation = data.allSanityLocation.edges.find(location => location.node.name === path[i]).node;
            context.lineTo(nextLocation.x, nextLocation.y);
          }
          context.stroke();
          
          // Convert canvas to data URL
          const imageURL = canvas.toDataURL();
      
          // Set the image with path drawn on it
          photoSphereRef.current.getPlugin(MapPlugin)?.setImage(imageURL, center, angle);
        };
      
      }, [path, currentIndex, reverse]);
      


    function nextLocation() {
        if (currentIndex < path.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }
    function prevLocation() {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }
    function returnToStart() {
        setPath(path.reverse())
        setCurrentIndex(0);
        setReverse(true);
    }

    return (
        <div className='MapPage'>
            <MainHeader />
            <div className="controlBox">
                <MapButton link=".." displayText="New Entrance" />
                <Link to={`/ChooseEnd/`} state={{ startName: start}}>
                    <MapButton link={""} displayText="New Destination" />
                </Link>
                {!reverse || (reverse && currentIndex < path.length - 1) ? (
                    <>
                        {currentIndex > 0 && (
                            <div className="destBox">
                                <div className="buttonDiv">
                                    <button className="customButton" onClick={prevLocation}>
                                        Previous Image
                                    </button>
                                </div>
                            </div>
                        )}
                        {currentIndex < path.length - 1 && (
                            <div className="destBox">
                                <div className="buttonDiv">
                                    <button className="customButton" onClick={nextLocation}>
                                        Next Image
                                    </button>
                                </div>
                            </div>
                        )}
                        {currentIndex === path.length - 1 && path[0] !== end && (
                            <div className="destBox">
                                <div className="buttonDiv">
                                    <button className="customButton" onClick={returnToStart}>
                                        Return to start
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <h1 className="">You have returned to the start.</h1>
                )}

            </div>


            <div className="mapContainer">
                <RouteElement path={path} currentIndex={currentIndex} className="navRoute"/>
                <ReactPhotoSphereViewer 
                    ref={photoSphereRef} 
                    height={'70vh'} 
                    width={"100%"}
                    plugins={[
                      [GyroscopePlugin],
                      [MapPlugin, {
                          imageUrl: '',
                          center: { x: 1035, y: 727 }, // Default coordinates
                          rotation: '0deg',
                          defaultZoom: 50,
                      }]
                  ]}                   
                />
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