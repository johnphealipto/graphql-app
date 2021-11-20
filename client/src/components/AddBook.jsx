import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS } from "../GraphQL/Queries";
import { ADD_BOOK } from "../GraphQL/Mutations";
import { GET_BOOKS } from "../GraphQL/Queries";

const AddBook = () => {
  const [authorList, setAuthorList] = useState([])
  const { loading, data } = useQuery(GET_AUTHORS)

  const [bookName, setBookName] = useState('')
  const [bookGenre, setBookGenre] = useState('')
  const [authorId, setAuthorId] = useState('')

  const [ addBook, { error }] = useMutation(ADD_BOOK)

  useEffect(() => {
    if(data) {
      setAuthorList(data.authors)
    }
  }, [data])

  const handleAddBook = (e) => {
    e.preventDefault()
    addBook({
      variables: {
        name: bookName, 
        genre: bookGenre, 
        authorId: authorId
      },
      refetchQueries: [{ query: GET_BOOKS }]
    })
    if(error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleAddBook}>
      <div className='input-field'>
        <label>Book Name: </label>
        <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} />
      </div>
      <div className='input-field'>
        <label>Genre: </label>
        <input type="text" value={bookGenre} onChange={(e) => setBookGenre(e.target.value)} />
      </div>
      <div className='input-field'>
        <label>Author: </label>
        <select name="" id="" value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          {loading ? 
            <option>Loading authors...</option>
            :
            <>
              <option>Select author</option>
              {authorList.map((item, index) => 
                <option key={index} value={item.id}>{item.name}</option>
              )}
            </>
          }
        </select>
      </div>
      <input type="submit" value="+" />
    </form>
  )
}

export default AddBook;