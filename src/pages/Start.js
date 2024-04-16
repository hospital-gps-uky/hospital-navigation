/*  For setting the start location from QR codes.
    The QR code needs to send the user to the URL + /Start/?start={entrance name}
    Example: https://hospitalnavigation.netlify.app/Start/?start=South_Limestone_Entrance_A
*/

import React, { useEffect } from 'react';
import {Router, useLocation} from "@reach/router"
import { navigate } from "gatsby"

const App = () => {
    return (
        <Router basepath="/">
          <Start path="/Start" />
        </Router>
    )
}

const Start = () => {
    const location = useLocation();
    let startName;
    
    if(location.search){
        const queryParameters = new URLSearchParams(location.search);
        // Remove spaces
        startName = queryParameters.get("start").replace(/_/g, ' ');;
    }

    // Set startName state variable
    useEffect(() => {
        navigate('/ChooseEnd/', {state: {startName: startName}}  );
    })

}

export default App;