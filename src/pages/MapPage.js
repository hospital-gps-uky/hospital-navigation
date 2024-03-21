import React, { useState, useEffect, useRef } from 'react';
import './MapPage.css';
import MapButton from '../components/MapButton';
import MainHeader from '../components/MainHeader';
import { graphql } from 'gatsby';
import { find_path } from 'dijkstrajs';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer'; // Import MapPlugin here
import { Viewer } from '@photo-sphere-viewer/core';
import { MapPlugin } from '@photo-sphere-viewer/map-plugin';

import '@photo-sphere-viewer/map-plugin/index.css';

function RouteElement({ path, currentIndex }) {
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

    // return constructed array of divs
    return (
        <div className='nav-route'>
            {locations}
        </div>
    )
}

function calculateWeight(location1, location2) {
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
        graph[edge.node.location1.name] = { [edge.node.location2.name]: weight }
    });
    return graph;
}

const MapPage = ({ data, location }) => {
    // Initialize photoSphereRef as a ref
    const photoSphereRef = useRef(null);

    const maps = data.allSanityMap.nodes;

    let start = location.state.startName;
    let end = location.state.endName;

    let [currentIndex, setCurrentIndex] = useState(0);
    let [path, setPath] = useState([]);

    useEffect(() => {
        if (start === undefined || end === undefined) {
            setPath([]);
            setCurrentIndex(0);
            return;
        }

        const edges = data.allSanityEdge.edges;
        const graph = createGraph(edges);
        setPath(find_path(graph, start, end));
        setCurrentIndex(0);
    }, [start, end]);

    useEffect(() => {
        if (!photoSphereRef.current) return;

        const newCurrentLocation = data.allSanityLocation.edges.find(location => location.node.name === path[currentIndex]).node;
        // Check if the setPanorama method is available before calling it
        if (photoSphereRef.current.setPanorama) {
            // Update panorama URL using setPanorama method
            photoSphereRef.current.setPanorama(newCurrentLocation.image3D.asset.publicUrl);

            // Update center coordinates dynamically
            const center = { x: newCurrentLocation.x, y: newCurrentLocation.y };
            photoSphereRef.current.getPlugin(MapPlugin).setCenter(center);
        }
    }, [path, currentIndex, data.allSanityLocation]);

    function nextLocation() {
        if (currentIndex < path.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    useEffect(() => {
        // Initialize Viewer object within useEffect
        photoSphereRef.current = new Viewer({
            container: document.getElementById('map-container'),
            panorama: '',
            plugins: [
                [MapPlugin, {
                    imageUrl: maps[0].image.asset.publicUrl,
                    center: { x: 1035, y: 727 }, // Default coordinates
                    rotation: '-12deg',
                }]
            ]
        });

        // Cleanup function to destroy Viewer instance
        return () => {
            photoSphereRef.current.destroy();
        };
    }, []);

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

            <div className="mapContainer" id="map-container">
                <RouteElement path={path} currentIndex={currentIndex} className="navRoute" />
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
}`;

export default MapPage;
