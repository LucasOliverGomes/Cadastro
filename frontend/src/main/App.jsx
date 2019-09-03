import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { HashRouter } from "react-router-dom";

import Routes from "./Routers";
import Logo from "../components/template/Logo";
import Nav from "../components/template/Nav";
//Main, nele já importa o Header
import Footer from "../components/template/Footer";

export default props => (
  <HashRouter>
    <div className="app">
      <Logo />
      <Nav />
      <Routes />
      <Footer />
    </div>
  </HashRouter>
);
