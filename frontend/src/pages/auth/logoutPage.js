import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("authUser");
    this.props.dispatch({ type: "AUTH_USER_LOGOUT" });
    this.props.history.push("/");
  }
  render() {
    return <span>please wait...</span>;
  }
}

const state = (state) => {
  return {
    ...state,
  };
};

const mappedState = connect(state)(Logout);

export default withRouter(mappedState);
