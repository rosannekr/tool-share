import "./App.css";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";
import Search from "./components/Search";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  let [displayedProducts, setDisplayedProducts] = useState("");
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [user, setUser] = useState({});

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch(`/products`)
      .then((response) => response.json())
      .then((response) => {
        setDisplayedProducts(response);
      });
  };
  let setProducts = (products) => {
    setDisplayedProducts(products);
  };

  // function to pass down to login component
  // to be able to set state to true when logged in
  const login = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Router>
        <SearchBar callback={(products) => setProducts(products)} />
        <Filter callback={(products) => setProducts(products)} />

        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login login={login} />
          </Route>
          <Route
            path="/search/:q"
            render={(props) => (
              <Search
                {...props}
                callback={(products) => setProducts(products)}
              />
            )}
          />
          <Route path="/searchBar" component={SearchBar} />

          <Route
            path="/searchBar"
            render={(props) => <SearchBar {...props} />}
          />
          <Route path="/filter" render={(props) => <Filter {...props} />} />
          <Route
            path="/"
            exact
            render={(props) => <Home {...props} products={displayedProducts} />}
          />
          <Route path="/user/:id">
            <ProfilePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
