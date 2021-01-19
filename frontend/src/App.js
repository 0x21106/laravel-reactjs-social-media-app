import { Component } from "react";
import { HomePage, LoginPage, RegisterPage, LogoutPage } from "./pages";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "DOCUMENT_LOADED" });
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={RegisterPage} />
          <Route path="/logout" component={LogoutPage} />
        </Switch>
      </div>
    );
  }
}

const state = (state) => {
  return {
    ...state,
  };
};

export default connect(state)(App);
