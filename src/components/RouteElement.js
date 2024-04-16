import React from 'react';

export default function RouteElement({ path, currentIndex }) {
    let locations = [];
  
    // Check if there are enough locations in the path
    if (path.length < 2) {
      locations.push(<div key={path[0]} className="navitem bold-location">{path[0]}</div>);
    } else {
      // If at the last index, display only the start and end locations
      if (currentIndex === path.length - 1) {
        locations.push(<div key={path[0]} className="navitem">{path[0]}</div>);
        locations.push(<div key={`${path[0]}Arrow`} className="nav-item">&nbsp; → &nbsp;</div>);
        locations.push(<div key={path[path.length - 1]} className="navitem bold-location">{path[path.length - 1]}</div>);
      } else {
        // Add the first location only if currentIndex is not 0
        if (currentIndex > 0) {
          locations.push(<div key={path[0]} className="navitem">{path[0]}</div>);
          locations.push(<div key={`${path[0]}Arrow`} className="nav-item">&nbsp; → &nbsp;</div>);
          locations.push(<div key={path[currentIndex - 1]} className="navitem">{path[currentIndex - 1]}</div>);
          locations.push(<div key={`${path[currentIndex - 1]}Arrow`} className="nav-item">&nbsp; → &nbsp;</div>);
        }
        
        // Add the current location
        locations.push(<div key={path[currentIndex]} className="navitem bold-location">{path[currentIndex]}</div>);
        locations.push(<div key={`${path[currentIndex]}Arrow`} className="nav-item">&nbsp; → &nbsp;</div>);
  
        // Add the next location (if not the last location)
        if (currentIndex < path.length - 2) {
          locations.push(<div key={path[currentIndex + 1]} className="navitem">{path[currentIndex + 1]}</div>);
          locations.push(<div key={`${path[currentIndex + 1]}Arrow`} className="nav-item">&nbsp; → &nbsp;</div>);
        }
        
        // Add the last location
        locations.push(<div key={path[path.length - 1]} className="navitem">{path[path.length - 1]}</div>);
      }
    }
  
    return <div className="nav-route">{locations}</div>;
}