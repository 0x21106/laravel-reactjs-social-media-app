import styled from "styled-components/macro";

export const Container = styled.div`
  width: 90%;
  min-height: 90px;
  // background-color:red;
`;

export const CommentHeader = styled.div``;

export const Profile = styled.div`
  width: 60px;
  height: 60px;
  flex: 0 0 60px;
  border-radius: 50%;
  overflow: hidden;
`;
export const IMG = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Username = styled.span`
  font-size: 0.9em;
  font-weight: 600;
`;

export const TextContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.5vmax;
  color: whitesmoke;
  font-size: 0.85em;
`;

export const Text = styled.span``;

export const SubCommentArea = styled.div`
  width: 90%;
  height: auto;
//   background-color: red;
`;

export const SubCommentContainer = styled.div``;

export const SubCommentHeader = styled.div``;

export const SubCommentProile = styled.div`
  width: 60px;
  height: 60px;
`;

export const Reply = styled.span`
  cursor:pointer;
  color:blue;
  font-size:.85em;
  font-weight:600;
`