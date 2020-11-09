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
import PrivateRoute from "./components/PrivateRoute";
import AddProduct from "./components/AddProduct";
import { userIsLoggedIn } from "./services/auth";

function App() {
  let [displayedProducts, setDisplayedProducts] = useState("");
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getProducts();
    setIsLoggedIn(userIsLoggedIn());
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

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Router>
        <Header
          callback={(products) => setProducts(products)}
          isLoggedIn={isLoggedIn}
          logout={logout}
        />

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
          <Route
            path="/filter"
            render={(props) => <CategoryNav {...props} />}
          />
          <Route
            path="/category/:category"
            render={(props) => (
              <Filters
                {...props}
                callback={(products) => setProducts(products)}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={(props) => <Home {...props} products={displayedProducts} />}
          />
          <PrivateRoute path="/profile">
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/products/upload">
            <AddProduct />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
