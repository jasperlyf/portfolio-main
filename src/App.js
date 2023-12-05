import CryptoApp from "./component/CryptoApp";
import WorkoutApp from "./component/WorkoutApp";
import FoodApp from "./component/FoodApp";
import MusicApp from "./component/MusicApp";
import About from "./component/About";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="MainApp container-fluid p-3">
        <Navbar />
        <div className="row">
          <div className="col-lg-12 col-md-12 d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-md-12">
              <div className="CenteredContent">
                <Switch>
                  <Route exact path="/" component={MusicApp} />
                  <Route path="/about" component={About} />
                  <Route path="/food" component={FoodApp} />
                  <Route path="/workout" component={WorkoutApp} />
                  <Route path="/crypto" component={CryptoApp} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
        <Footer className="Footer" />
      </div>
    </Router>
  );
}

export default App;
