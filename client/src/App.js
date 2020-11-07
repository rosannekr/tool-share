import "./App.css";
import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";
import ProductPage from "./components/ProductPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  let [displayedProducts, setDisplayedProducts] = useState("");
  let [isLoggedIn, setIsLoggedIn] = useState(false);

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
  const login = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Router>

        <Header callback={(products) => setProducts(products)}  />
    
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


          <Route path="/product/:id" render={props => <ProductPage {...props} />} /> 

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
