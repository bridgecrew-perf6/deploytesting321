import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation LogIn($credentials: String!) {
    login(credentials: $credentials)
  }
`;
