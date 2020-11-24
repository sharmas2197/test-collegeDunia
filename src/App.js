import React from "react";
import "./App.css";
import { Switch, BrowserRouter, Route,  } from "react-router-dom";
import Home from "./Components/Home";

const App = props => {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
