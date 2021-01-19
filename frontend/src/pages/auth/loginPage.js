import { Component } from "react";
import { HeaderComponent } from "../../components";

import { LoginComponent } from "../../components";

class LoginPage extends Component {
  render() {
    return (
      <>
        <HeaderComponent />
        <LoginComponent />
      </>
    );
  }
}

export default LoginPage;
