import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Messages from "./components/Messages";
import Inbox from "./components/Inbox";
import ProductPage from "./components/ProductPage";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import AddProduct from "./components/AddProduct";
import Requests from "./components/Requests";
import HowItWorks from "./components/HowItWorks";
import { userIsLoggedIn } from "./helpers/auth";
import "./main.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(userIsLoggedIn());
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} logout={logout} />

        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login">
            <Login login={login} />
          </Route>

          <Route path="/search" component={Search} />

          <PrivateRoute path="/product/:id">
            <ProductPage />
          </PrivateRoute>

          <Route path="/" exact component={LandingPage} />
          <Route path="/how-it-works" component={HowItWorks} />

          <PrivateRoute path="/messages">
            <Messages />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/products/upload">
            <AddProduct />
          </PrivateRoute>
          <PrivateRoute path="/requests">
            <Requests />
          </PrivateRoute>
        </Switch>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
