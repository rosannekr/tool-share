import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Filters from "./components/Filters";
import CategoryNav from "./components/CategoryNav";
import SearchBar from "./components/SearchBar";
import ProductPage from "./components/ProductPage";
import ProfilePage from "./components/ProfilePage";


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
        <Header callback={(products) => setProducts(products)} isLoggedIn={isLoggedIn} />

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
            path="/product/:id"
            render={(props) => <ProductPage {...props} />}
          />

          <Route
            path="/searchBar"
            render={(props) => <SearchBar {...props} />}
          />
          <Route path="/filter" render={(props) => <CategoryNav {...props} />} />
          <Route path="/category/:category" render={(props) => <Filters {...props} callback={(products) => setProducts(products)} />} />
          <Route
            path="/"
            exact
            render={(props) => <Home {...props} products={displayedProducts} />}
          />
          <Route path="/profile">
            <ProfilePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
