const SelectShelf = ({ book, onChangeShelf }) => {


    const handleChange = (e) => {
        let newShelf = e.target.value;

        onChangeShelf(book, newShelf);
    }


    return (
        <div className="book-shelf-changer">
            <select value={book.shelf} onChange={handleChange}>
                <option value="" disabled>
                    Move to...
                </option>
                <option value="currentlyReading" >
                    Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

export default SelectShelf;