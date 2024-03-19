import React, { useState, useEffect, useRef } from 'react';
import './MapPage.css';
import MapButton from '../components/MapButton';
import MainHeader from '../components/MainHeader';
import { GatsbyImage} from 'gatsby-plugin-image'
import { graphql } from 'gatsby';

import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { DijkstraCalculator } from 'dijkstra-calculator';

 
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


function MiniMap({ path, currentIndex }) {
    const canvasRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!canvasRef.current || !path || path.length === 0 || !path[currentIndex]) return;

        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Fetch map image URL using the currentIndex's map_id
        const mapId = path[currentIndex].map_id;
        const mapImageUrl = `http://localhost:8000/map/image/get/${mapId}`; // Adjust this to your API endpoint

        // Draw the map image on the canvas
        const mapImage = new Image();
        mapImage.onload = () => {
            // Draw the map image at the current x and y coordinates with zoom
            const scaleFactor = .75; // Adjust the zoom factor as needed
            const currentLocation = path[currentIndex];
            const x = currentLocation.x + dragOffset.x;
            const y = currentLocation.y + dragOffset.y;
            const width = canvasRef.current.width / scaleFactor;
            const height = canvasRef.current.height / scaleFactor;
            ctx.drawImage(mapImage, x - width / 2, y - height / 2, width, height, 0, 0, canvasRef.current.width, canvasRef.current.height);
            
            // Draw lines for the path on the mini-map
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.beginPath();
            path.forEach((location, index) => {
                if (index > 0) {
                    const prevLocation = path[index - 1];
                    const currentLocation = path[index];
                    // Adjust line coordinates for scaling and zooming
                    const prevX = (prevLocation.x - x + width / 2) * scaleFactor;
                    const prevY = (prevLocation.y - y + height / 2) * scaleFactor;
                    const currX = (currentLocation.x - x + width / 2) * scaleFactor;
                    const currY = (currentLocation.y - y + height / 2) * scaleFactor;
                    ctx.moveTo(prevX, prevY);
                    ctx.lineTo(currX, currY);
                    ctx.stroke();
                }
            });
        };
        mapImage.src = mapImageUrl;
    }, [path, currentIndex, dragOffset]);

    const handleMouseDown = (e) => {
        setDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const offsetX = e.clientX - dragStart.x + dragOffset.x;
        const offsetY = e.clientY - dragStart.y + dragOffset.y;
        setDragOffset({ x: offsetX, y: offsetY });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={300}
            style={{ position: 'absolute', bottom: 10, left: 10, cursor: dragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
        />
    );
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
        if (path.length <= 0) return;
        const newCurrentLocation = data.allSanityLocation.edges.find(location => location.node.name === path[currentIndex]).node;
        photoSphereRef.current.setPanorama(newCurrentLocation.image3D.asset.publicUrl);
    }, [path, currentIndex]);

    function nextLocation() {
        if (currentIndex < path.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

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
                <ReactPhotoSphereViewer ref={photoSphereRef} height={'100vh'} width={"100%"}></ReactPhotoSphereViewer>
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