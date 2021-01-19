import { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  HeaderItem,
  HeaderTitle,
  UserAreaContainer,
  Text,
  Username,
} from "./header.style";

class HeaderComponent extends Component {
  render() {
    return (
      <Container className="d-flex flex-row align-items-center justify-content-between px-2 my-1">
        <HeaderTitle to="/">Posts</HeaderTitle>
        {this.props.authUser ? (
          <UserAreaContainer className="d-flex align-items-center">
            <Text>
              Hi,&nbsp;
              <Username>{this.props.authUser.username}</Username>
            </Text>
            <HeaderItem to="/logout" className="ms-3">Logout</HeaderItem>
          </UserAreaContainer>
        ) : (
          <div>
            <HeaderItem to="/login" className="mx-2">
              Login
            </HeaderItem>
            <HeaderItem to="/signup" className="mx-2">
              Signup
            </HeaderItem>
          </div>
        )}
      </Container>
    );
  }
}

const state = (state) => {
  return {
    ...state,
  };
};

export default connect(state)(HeaderComponent);
