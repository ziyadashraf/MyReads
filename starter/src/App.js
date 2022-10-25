import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./pages/Search";
import * as BooksAPI from "./BooksAPI";
import { Link, Route, Routes } from "react-router-dom";
import Shelf from "./components/Shelf";

function App() {

  const [books, setBooks] = useState([])

  const shelves = [
    {
      name: "currentlyReading",
      title: "Currently Reading",
    },
    {
      name: "wantToRead",
      title: "Want to Read",
    },
    {
      name: "read",
      title: "Read",
    }
  ]

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();


  }, []);



  const onChangeShelf = (book, newShelf) => {

    BooksAPI.update(book, newShelf).then(() => {

      if (book.shelf === 'none' && newShelf !== 'none') {
        setBooks(books.concat(book))
      }

      book.shelf = newShelf;

      const updatedShelfBooks = books.filter(b => b.id !== book.id);

      updatedShelfBooks.push(book)

      setBooks(updatedShelfBooks)
    })

  }



  return (

    <Routes>
      <Route exact path="/" element={

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          {
            shelves.map(shelf =>
            (
              <Shelf
                shelfBooks={books.filter(book => book.shelf === shelf.name)}
                shelf={shelf}
                onChangeShelf={onChangeShelf}
                key={shelf.name} />
            )
            )
          }
          <div className="open-search">
            <Link to="/search" >Add a book</Link>
          </div>
        </div>

      } />

      <Route path="/search" element={
        <SearchPage books={books} onChangeShelf={onChangeShelf} />
      } />

    </Routes>

  );
}

export default App;
