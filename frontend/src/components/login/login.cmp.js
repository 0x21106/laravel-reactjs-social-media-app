import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";

import {
  Container,
  LoginContainer,
  LoginTitle,
  LoginForm,
  LoginInput,
  LoginSubmit,
} from "./login.style";

class LoginComponent extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const email = target[0].value.trim();
    const password = target[1].value.trim();
    axios
      .post("http://localhost:8000/api/users/login", {
        email: email,
        password: password,
      })
      .then((data) => {
        swal.fire({
          icon: "success",
          text: "Successfully logged in :)",
        });
        this.props.dispatch({
          type: "AUTH_USER_LOGIN",
          data: data.data.data,
        });
        localStorage.setItem("authUser", JSON.stringify(data.data.data));
        this.props.history.push("/");
      })
      .catch((error) => {
        swal.fire({
          icon: "error",
          text: error,
        });
      });
  }
  render() {
    return (
      <Container className="d-flex flex-column align-items-center mt-5">
        <LoginContainer className="d-flex flex-column align-items-center pb-5 pt-4">
          <LoginTitle>Login</LoginTitle>
          <LoginForm
            onSubmit={(event) => this.handleSubmit(event)}
            className="d-flex flex-column align-items-center"
          >
            <LoginInput type="text" className="my-2 ps-2" placeholder="email" />
            <LoginInput
              type="password"
              className="my-2 ps-2"
              placeholder="password"
            />
            <LoginSubmit type="submit" className="px-4">
              Login
            </LoginSubmit>
          </LoginForm>
        </LoginContainer>
      </Container>
    );
  }
}

const state = (state) => {
  return {
    ...state,
  };
};

const mappedState = connect(state)(LoginComponent);

export default withRouter(mappedState);
