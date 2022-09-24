const Book = (props) => {
  // store thumbnail link in variable
  let thumbnail = props.book.imageLinks;
  // console.log(thumbnail);
  thumbnail ? (thumbnail = thumbnail.thumbnail) : (thumbnail = "");
  // Book Data
  let bookTitle = props.book.title;
  let bookAuthor = props.book.authors;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: `url("${thumbnail}")`,
          }}
        />
        <div className="book-shelf-changer">
          <select value={props.shelf} onChange={(event) => props.updateShelf(props.book, event.target.value)}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{bookTitle}</div>
      <div className="book-authors">{bookAuthor}</div>
    </div>
  );
};

export default Book;
