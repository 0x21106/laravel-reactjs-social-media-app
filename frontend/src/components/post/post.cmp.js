import { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  PostHeader,
  Profile,
  IMG,
  Username,
  PostDate,
  PostText,
  CommentsArea,
  CommentsTitle,
  CommentForm,
  CommentInput,
  CommentButton,
} from "./post.style";

import { CommentComponent } from "..";
import axios from "axios";
import Swal from "sweetalert2";

// Fake Comments Data
// const dummyData = [
//   {
//     id: 1,
//     text: "Welcome :)",
//     parent: null,
//     user: {
//       uid: 2,
//       username: "Esmeralda",
//       profile:
//         "https://pm1.narvii.com/6545/dce382e1337dc45e8652fa24ea0eb86533beb008_00.jpg",
//     },
//   },
//   {
//     id: 2,
//     text: "Thanks :)",
//     parent: 1,
//     user: {
//       uid: 1,
//       username: "Aykhanexe",
//       profile:
//         "https://pm1.narvii.com/6835/f818ee713da4a90773789b3da6c488629b200441v2_00.jpg",
//     },
//   },
// ];

class PostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
    };
  }

  componentDidMount() {
    this.getComments();
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

  attachComments() {
    return Array.prototype.slice
      .call(Object.values(this.state.comments))
      .map((comment) => {
        return <CommentComponent $postId={this.props.data.id} key={comment.id} data={comment} />;
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

  checkAuth(event) {
    if (this.props.authUser !== null) {
      return true;
    } else {
      alert("please login for comment :)");
      event.target.blur();
      event.preventDefault();
      return false;
    }
  }

  searchParent(element, classname) {
    const parent = element.parentNode;
    if (parent) {
      const isThisMyParent = parent.classList?.contains(classname);
      if (!isThisMyParent) {
        this.searchParent(parent);
      }
      return parent;
    }
  }

  sendMessage(event) {
    event.preventDefault();
    const target = event.target;
    const text = target[0].value.trim();

    const credentials = {
      post_id: this.props.data.id,
      text: text,
      uid: this.props.authUser.id,
    };

    axios
      .post("http://localhost:8000/api/comments", credentials)
      .then(async (data) => {
        // Array.prototype.slice
        //   .call(
        //     this.searchParent(event.target, "post-container").querySelectorAll(
        //       ".comment-item"
        //     )
        //   )
        //   .map((item) => item.remove());

        await this.getComments();
        await this.attachComments();
        Swal.fire({
          icon: "success",
          text: "comment added :)",
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
      <Container className="post-container d-flex flex-column my-2 mx-1 p-2">
        <PostHeader className="d-flex flex-row align-items-center px-2 py-1">
          <Profile>
            <IMG src={this.props.data.user.profile} />
          </Profile>
          <div className="d-flex flex-column ms-3">
            <Username>{this.props.data.user.username}</Username>
            <PostDate>{this.props.data.createdAt}</PostDate>
          </div>
        </PostHeader>
        <PostText className="mx-2 my-2">{this.props.data.text}</PostText>
        <CommentsArea className="d-flex flex-column my-3 mx-2">
          <CommentsTitle>Comments</CommentsTitle>
          <CommentForm
            onSubmit={(event) => this.sendMessage(event)}
            method="POST"
            className="d-flex align-items-center mt-2 mb-3"
          >
            <CommentInput
              onClick={(event) => this.checkAuth(event)}
              type="text"
              placeholder="your comment..."
              className="me-2 ps-2"
            />
            <CommentButton type="submit" className="px-3">
              Send
            </CommentButton>
          </CommentForm>
          {/* Comments */}
          {this.props.documentReadyState === "__LOADED__" ? (
            this.state.comments === null ? (
              <div>loading...</div>
            ) : (
              this.attachComments()
            )
          ) : (
            <div>Loading</div>
          )}
        </CommentsArea>
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
