import React from "react";
import "./App.css";
import Register from "./register";
import Login from "./login";
import Profile from "./profile";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

const isLoggedIn = () => {
  const key = "members_accessToken";
  let member = JSON.parse(window.localStorage.getItem(key));
  if (member && member.accessToken) return true;
  else return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
};

const BasicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const App = () => (
  <Router>
    <Switch>
      <BasicRoute path="/login" component={Login} />
      <BasicRoute path="/register" component={Register} />
      <PrivateRoute path="/" component={Profile} />
    </Switch>
  </Router>
);
export default App;
