import axios from "axios";
import { connect } from "react-redux";
import { Component } from "react";
import { CommentButton, CommentForm, CommentInput } from "../post/post.style";
import {
  Container,
  CommentHeader,
  IMG,
  Profile,
  Username,
  TextContainer,
  Text,
  SubCommentArea,
  SubCommentContainer,
  SubCommentHeader,
  SubCommentProile,
  Reply,
} from "./comment.style";
import Swal from "sweetalert2";

class CommentComponent extends Component {
  addSubComment(commentData) {
    return (
      <SubCommentContainer
        key={commentData.id}
        className="comment-item d-flex flex-column my-2"
      >
        <SubCommentHeader className="d-flex flex-row align-items-center">
          <SubCommentProile>
            <Profile>
              <IMG src={commentData.user?.profile} />
            </Profile>
          </SubCommentProile>
          <Username className="ms-2">{commentData.user?.username}</Username>
        </SubCommentHeader>
        <TextContainer className="ms-2 mt-2 p-2">
          <Text>{commentData.text}</Text>
        </TextContainer>
      </SubCommentContainer>
    );
  }

  openCommentForm(event) {
    event.target.parentNode
      .querySelector(".reply-form")
      .classList.remove("d-none");
  }

  handleData() {
    return new Promise((resolve, reject) => {
      try {
        const newComments = {};
        let currentIndex = null;
        this.state.OriginalComments.forEach((comment, index) => {
          if (comment.parent) {
            if ("comments" in newComments[currentIndex]) {
              newComments[currentIndex]["comments"].push(comment);
            } else {
              newComments[currentIndex]["comments"] = [comment];
            }
          } else {
            currentIndex = index;
            newComments[index] = comment;
          }
        });
        return resolve(newComments);
      } catch (error) {
        reject(error);
      }
    });
  }

  getComments() {
    return new Promise((resolve, reject) => {
      try {
        fetch(
          `http://localhost:8000/api/comments&post_id=${this.props.data.id}`
        )
          .then((buffer) => buffer.json())
          .then((data) => {
            this.setState({
              ...this.state,
              OriginalComments: data,
            });
            this.handleData().then((data) => {
              this.setState({
                ...this.state,
                comments: data,
              });
              resolve();
            });
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  attachComments() {
    return Array.prototype.slice
      .call(Object.values(this.state.comments))
      .map((comment) => {
        return (
          <CommentComponent
            $postId={this.props.data.id}
            key={comment.id}
            data={comment}
          />
        );
      });
  }

  addReplyComment(event) {
    event.preventDefault();
    const target = event.target;
    const text = target[0].value.trim();
    const credentials = {
      post_id: this.props.$postId,
      uid: this.props.authUser.id,
      text: text,
      parent: this.props.data.id,
    };
    axios
      .post("http://localhost:8000/api/comments", credentials)
      .then(async (data) => {
        Swal.fire({
          icon: "success",
          text: "Comment added :)",
        }).then(() => {
          window.location.reload(false)
        });
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
      <Container
        data-comment-id={this.props.$dataCommentId}
        className="comment-item d-flex flex-column justify-content-center my-2"
      >
        <CommentHeader className="d-flex flex-row align-items-center">
          <Profile>
            <IMG src={this.props.data.user?.profile} />
          </Profile>
          <Username className="ms-2">{this.props.data.user?.username}</Username>
        </CommentHeader>
        <TextContainer className="ms-5 p-2">
          <Text>{this.props.data.text}</Text>
        </TextContainer>
        <Reply
          onClick={(event) => this.openCommentForm(event)}
          className="ms-5"
        >
          Reply
        </Reply>
        <CommentForm
          onSubmit={(event) => this.addReplyComment(event)}
          className="reply-form d-none ms-5"
        >
          <CommentInput
            type="text"
            className="me-2 ps-2"
            placeholder="reply comment"
          />
          <CommentButton>Send</CommentButton>
        </CommentForm>
        <SubCommentArea className="py-1 ms-5">
          {this.props.data.comments?.map((comment) => {
            return this.addSubComment(comment);
          })}
        </SubCommentArea>
      </Container>
    );
  }
}

const state = (state) => {
  return {
    ...state,
  };
};

export default connect(state)(CommentComponent);
