import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../GraphQL/Queries";

const Books = () => {
  const [bookList, setBookList] = useState([])
  const { data } = useQuery(GET_BOOKS)

  useEffect(() => {
    if(data){  
      setBookList(data.books)
    }
  }, [data])

  return (
    <div>
      <ul>
        {bookList.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Books;