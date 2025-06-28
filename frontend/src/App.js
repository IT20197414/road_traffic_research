import "./App.css";
import './css/elegant-icons.css';
import './css/font-awesome.min.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Camera from "./components/Camera";
import Main from "./components/Main";
import Accident from "./components/Accident";
import Person from "./components/Person";
import Phone from "./components/Phone";
import Vehicle from "./components/Vehicle";
import Register from "./components/Register";
import User from "./components/User";
import Login from "./components/Login";
import Map from "./components/Map";
import Nav from "./components/nav";
import Footer from "./components/footer";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";
import { height } from "@mui/system";

function App() {
  return (
    <Router>
      <div
        className="App center-div-custom"
        style={{
          backgroundImage: "url(/team-bg.jpg)",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <Nav />
        <Switch>
          <Route path="/main" component={Main}></Route>
          <Route path="/accident" component={Accident}></Route>
          <Route path="/person" component={Person}></Route>
          <Route path="/phone" component={Phone}></Route>
          <Route path="/vehicle" component={Vehicle}></Route>
          <Route path="/camera" component={Camera}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/map" component={Map}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/" component={User}></Route>
        </Switch>
        <ButterToast position={{ vertical: POS_TOP , horizontal: POS_RIGHT }} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
