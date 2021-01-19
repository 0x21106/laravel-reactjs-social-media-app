import styled from "styled-components/macro";

export const Container = styled.div`
  width: 95%;
  height: auto;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  border-radius: 1.5vmax;
  font-family: "Poppins";
`;
export const PostHeader = styled.div`
  width: 100%;
  height: auto;
`;
export const Profile = styled.div`
  width: 60px;
  flex: 0 0 60px;
  height: 60px;
  background-color: red;
  border-radius: 50%;
  overflow: hidden;
`;
export const IMG = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const Username = styled.span`
  font-weight: 600;
  font-size: 0.9em;
`;
export const PostDate = styled.span`
  font-size: 0.7em;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`;
export const PostText = styled.span``;

export const CommentsArea = styled.div``;
export const CommentsTitle = styled.span`
  font-size: 1.2em;
  font-weight: 600;
`;

export const CommentForm = styled.form`
  width: 100%;
  height: auto;
`;
export const CommentInput = styled.input`
  width: 300px;
  max-width: 100%;
  height: 35px;
  border-radius: 0.5vmax;
  opacity: 0.75;
  transition: opacity 0.3s ease-out;
  &:focus {
    opacity: 1;
  }
`;
export const CommentButton = styled.button`
  height: 35px;
  border-radius: 0.5vmax;
`;
