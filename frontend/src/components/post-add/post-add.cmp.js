import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import {
  Container,
  PostAddForm,
  PostAddInput,
  PostAddButton,
} from "./post-add.style";

class PostComponent extends Component {
  submitPost(event) {
    event.preventDefault();
    const target = event.target;
    const text = target[0].value.trim();
    const credentials = {
      userId: this.props.authUser.id,
      text: text,
    };
    axios
      .post("http://localhost:8000/api/posts", credentials)
      .then((data) => {
        Swal.fire({
          icon: "success",
          text: "Post Added Successfully",
        }).then(() => window.location.reload(false));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  }
  render() {
    return (
      <Container className="me-auto ms-5">
        <PostAddForm
          onSubmit={(event) => this.submitPost(event)}
          className="d-flex flex-column"
        >
          <PostAddInput placeholder="post" className="my-2" />
          <PostAddButton type="submit">Add</PostAddButton>
        </PostAddForm>
      </Container>
    );
  }
}

const state = (state) => {
  return {
    ...state,
  };
};

export default connect(state)(PostComponent);
