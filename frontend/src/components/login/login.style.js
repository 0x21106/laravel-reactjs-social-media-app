import styled from "styled-components/macro";

export const Container = styled.div`
  width: 100%;
  height: 200px;
`;

export const LoginContainer = styled.div`
  width: 40%;
  height: auto;
  background-color: whitesmoke;
  color: rgb(33, 32, 40);
  border-radius: 1vmax;
`;

export const LoginTitle = styled.h1`
  text-transform: uppercase;
`;

export const LoginForm = styled.form`
  width: 100%;
  height: 100%;
`;
export const LoginInput = styled.input`
  height: 35px;
  border-radius: 5px;
  background-color: rgb(77 83 83);
  color:whitesmoke;
  &::placeholder {
      color:whitesmoke;
  }
`;
export const LoginSubmit = styled.button`
  background-color: rgb(77 83 83);
  color:whitesmoke;
  height: 35px;
  border-radius: 5px;
  &::placeholder {
      color:whitesmoke;
  }
`;
