import "./App.css";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";
import Search from "./components/Search";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  let [displayedProducts, setDisplayedProducts] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch(`/products`)
      .then((response) => response.json())
      .then((response) => {
        setDisplayedProducts(response)
      });
  };
  let setProducts = (products) => {
    setDisplayedProducts(products)
  }

  return (
    <div className="App">
      <Router>

        <SearchBar callback = {(products) => setProducts(products)} />
        <Filter callback = {(products) => setProducts(products)}/>

        <Switch>
          <Route
            path="/search/:q"
            render={(props) => <Search {...props} callback = {(products) => setProducts(products)}/>}
          />
          <Route path="/searchBar" component={SearchBar} />

          <Route
            path="/searchBar"
            render={(props) => <SearchBar {...props} />}
          />
          <Route
            path="/filter"
            render={(props) => <Filter {...props}  />}
          />
          <Route path="/" exact render={(props) => <Home {...props} products={displayedProducts}  />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
