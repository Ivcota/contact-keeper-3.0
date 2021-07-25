import React from "react";
import Navbar from "./components/layouts/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  );
};

export default App;
