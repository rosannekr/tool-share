import "./App.css";
import Filter from "./Filter";
import SearchBar from "./SearchBar";
import Search from "./Search";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
  return (
    <div className="App">
  

      <Router>
      <SearchBar {...props} />
      <Filter />
    <Switch>

    <Route path="/search/:search" render={(props) => <Search {...props} />} />
    <Route path="/searchBar" component={SearchBar} />
    <Route path="/filter" component={Filter} />

    </Switch>
      </Router>
    </div>
  );
}

export default App;
