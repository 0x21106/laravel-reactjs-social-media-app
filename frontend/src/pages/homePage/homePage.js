import { Component } from "react";
import {connect} from "react-redux";
import {
  HeaderComponent,
  PostComponent,
  PostAddComponent,
} from "../../components";

// const dummyData = [
//   {
//     id: 1,
//     text: "Hi, this is my first post!",
//     user: {
//       profile:
//         "https://pm1.narvii.com/6835/f818ee713da4a90773789b3da6c488629b200441v2_00.jpg",
//       username: "Aykhanexe",
//     },
//     createdAt: "2021 Jan. 19",
//   },
// ];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: null,
    };
  }
  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch("http://localhost:8000/api/posts")
      .then((buffer) => buffer.json())
      .then((data) => {
        this.setState({
          ...this.state,
          postData: data,
        });
      });
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center">
        <HeaderComponent />
        {this.props.authUser ? <PostAddComponent /> : null}
        {this.state.postData === null ? (
          <span>loading</span>
        ) : (
          this.state.postData.map((post) => {
            return <PostComponent key={`post-${post.id}`} data={post} />;
          })
        )}
      </div>
    );
  }
}

const state = (state) => {
  return {
    ...state
  }
}

export default connect(state)(HomePage);
