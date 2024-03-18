import React from 'react';

function MapButton({link, displayText}) {
    return (
        <div className="destBox">
            <div className="buttonDiv">
                <a href={link}>
                    <button className="customButton" role="button">{displayText}</button>
                </a>
            </div>
        </div>
    )
}

export default MapButton