import Book from "../components/Book"


const Shelf = ({ shelfBooks, shelf, onChangeShelf }) => {

    return (
        <div className="list-books-content">

            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title" name={shelf.name}>{shelf.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {shelfBooks.map(book => {
                                return (
                                    <Book book={book} onChangeShelf={onChangeShelf} key={book.id} />
                                )
                            })
                            }
                        </ol>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Shelf;