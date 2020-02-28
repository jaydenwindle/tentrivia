import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

export { Route } from "react-router-dom";

export default function NavigationProvider({ children }) {
  return (
    <Router>
      <Switch>{children}</Switch>
    </Router>
  );
}
