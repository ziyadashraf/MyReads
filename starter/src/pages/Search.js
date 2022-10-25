import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from '../BooksAPI'
import Book from "../components/Book";


const SearchPage = ({ books, onChangeShelf }) => {


  const [foundBooks, setFoundBooks] = useState([])


  const handleQuery = (queryToHandle) => {



    if (queryToHandle.length > 0) {
      BooksAPI.search(queryToHandle.replace(" ", "")).then((res) => {

        if (queryToHandle.length > 0 && res.error) {
          setFoundBooks([])

        } else {
          const searchedBooks = res.map(foundBook => {

            foundBook['shelf'] = 'none'

            books.map(book => {
              if (book.id === foundBook.id) {
                foundBook.shelf = book.shelf;
              }
            })

            return foundBook;

          });

          setFoundBooks(searchedBooks)
        }


      });
    } else {
      setFoundBooks([])
    }





  }



  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to='/' className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(event) => handleQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {foundBooks &&
            foundBooks.map(book => {
              return (
                <Book book={book} onChangeShelf={onChangeShelf} />
              )
            })}
        </ol>
      </div>
    </div>
  )
}

export default SearchPage;