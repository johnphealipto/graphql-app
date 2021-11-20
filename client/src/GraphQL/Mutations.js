import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
    }
  }
`