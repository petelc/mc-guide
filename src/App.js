import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { HomePage } from "./components/HomePage";
import { Housing } from "./components/Housing";
import "./sass/main.scss";

const App = () => (
  <Router>
    <Route exact path="/" component={HomePage} />
    <Route path="/housing" component={Housing} />
  </Router>
);

export default App;
