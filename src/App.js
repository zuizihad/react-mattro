import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound'
import Destination from './components/Destination/Destination';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Search from './components/Search/Search';

export const userContext = createContext();

function App() {
  const [loggedInUser, setloggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setloggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/search/:value">
            <Search></Search>
          </PrivateRoute>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
