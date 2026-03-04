import React from "react";
import "./App.css";
import HomeScreen from "./components/HomeScreen";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (window.location.search === "?") {
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const user = null;
  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route
              exact
              path="/"
            >
              <HomeScreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
