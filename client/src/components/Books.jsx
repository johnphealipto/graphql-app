import React from 'react';
import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  {
    books {
      name
      id
    }
  }
`

const Books = () => {
  return (
    <div>
      <ul>
        <li>Book Names</li>
      </ul>
    </div>
  )
}

export default Books;