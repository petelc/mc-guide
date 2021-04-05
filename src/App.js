import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import Page from "./components/Page";
import { HomePage } from "./components/HomePage";
import { Housing } from "./components/Housing";
import { Food } from "./components/Food";
import "./sass/main.scss";

const App = () => (
  <Router>
    {/* <Page /> */}
    <Route exact path="/" component={HomePage} />
    <Route path="/housing" component={Housing} />
    <Route path="/food" component={Food} />
  </Router>
);

export default App;
