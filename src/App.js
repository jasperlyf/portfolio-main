import React from "react";
import CryptoApp from "./component/CryptoApp";
import WorkoutApp from "./component/WorkoutApp";
import FoodApp from "./component/FoodApp";
import MusicApp from "./component/MusicApp";
import About from "./component/About";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./component/css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="main-app-container container-fluid p-3">
        <Navbar /> {/* Navbar always displayed */}
        <div className="row content" style={{ marginTop: "60px" }}>
          <div className="col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-md-12">
              <Switch>
                <Route path="/portfolio-main/about" component={AboutContainer} />
                <Route path="/portfolio-main/food" component={FoodAppContainer} />
                <Route path="/portfolio-main/workout" component={WorkoutAppContainer} />
                <Route path="/portfolio-main/crypto" component={CryptoAppContainer} />
                <Route exact path="/portfolio-main" component={MusicAppContainer} />
                {/* other routes go here */}
              </Switch>
            </div>
          </div>
        </div>
        <Footer className="Footer" />
      </div>
    </Router>
  );
}

const MusicAppContainer = () => {
  return (
    <div>
      {/* Place your MusicApp component directly */}
      <MusicApp />
    </div>
  );
};

const AboutContainer = () => {
  return (
    <div>
      {/* Place your MusicApp component directly */}
      <About />
    </div>
  );
};

const FoodAppContainer = () => {
  return (
    <div>
      {/* Place your MusicApp component directly */}
      <FoodApp />
    </div>
  );
};

const WorkoutAppContainer = () => {
  return (
    <div>
      {/* Place your MusicApp component directly */}
      <WorkoutApp />
    </div>
  );
};

const CryptoAppContainer = () => {
  return (
    <div>
      {/* Place your MusicApp component directly */}
      <CryptoApp />
    </div>
  );
};

export default App;
