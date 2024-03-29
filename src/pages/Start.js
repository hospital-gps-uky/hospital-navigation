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
    
    const queryParameters = new URLSearchParams(location.search);

    let startName = queryParameters.get("start").replace(/_/g, ' ');;
    useEffect(() => {
        navigate('/ChooseEnd/', {state: {startName: startName}}  );
    })

}

export default App;