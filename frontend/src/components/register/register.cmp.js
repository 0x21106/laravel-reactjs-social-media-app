import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Container,
  RegisterContainer,
  RegisterTitle,
  RegisterForm,
  RegisterInput,
  RegisterSubmit,
} from "./register.style";
import axios from "axios";
import swal from "sweetalert2";

class RegisterComponent extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const t = event.target;
    const username = t[0].value.trim();
    const email = t[1].value.trim();
    const password = t[2].value.trim();
    const profilePictureUrl = t[3].value.trim();

    let credentials = {};

    credentials["username"] = username;
    credentials["email"] = email;
    credentials["password"] = password;

    if (profilePictureUrl.length > 0) {
      credentials["profile"] = profilePictureUrl;
    }

    axios
      .post("http://localhost:8000/api/users/", credentials)
      .then(async (data) => {
        await swal
          .fire({
            icon: "success",
            text: `Hi, ${username}\nYour account successfully created!`,
          })
          .then(() => {
            const res = data.data;
            const user = {
              id: res.id,
              username: res.username,
              email: res.email,
              profile: res.profile,
            };
            localStorage.setItem("authUser", JSON.stringify(user));
            this.props.dispatch({
              type: "AUTH_USER_LOGIN",
              data: user,
            });
            this.props.history.push("/");
          });
      })
      .catch(async (error) => {
        await swal.fire({
          icon: "error",
          text: error,
        });
      });
  }
  render() {
    return (
      <Container className="d-flex align-items-center justify-content-center mt-5">
        <RegisterContainer className="d-flex flex-column justify-content-center align-items-center pt-1 pb-3">
          <RegisterTitle>Register</RegisterTitle>
          <RegisterForm
            onSubmit={(event) => this.handleSubmit(event)}
            className="d-flex flex-column px-3"
          >
            <RegisterInput
              type="text"
              className="my-1 ps-2"
              placeholder="username"
            />
            <RegisterInput
              type="email"
              className="my-1 ps-2"
              placeholder="email"
            />
            <RegisterInput
              type="password"
              className="my-1 ps-2"
              placeholder="password"
            />
            <RegisterInput
              type="text"
              className="my-1 ps-2"
              placeholder="profile picture url"
            />
            <RegisterSubmit className="my-1">Register</RegisterSubmit>
          </RegisterForm>
        </RegisterContainer>
      </Container>
    );
  }
}

const state = (state) => {
  return {
    ...state,
  };
};

const mappedState = connect(state)(RegisterComponent);
export default withRouter(mappedState);
