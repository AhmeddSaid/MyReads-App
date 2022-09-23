import React, { useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

const Search = ({ books, updateShelf }) => {
  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);

  const updateQuery = (query) => {
    setQuery(query.trim()); // trim white spaces from query
    BooksAPI.search(query, 10).then((resultBooks) => {
      // search = (query, maxResults)
      setSearchBooks(resultBooks);
    });
  };

  const clearQuery = () => {
    updateQuery("");
  };

  let choosenBooks = searchBooks.map((searchBook) => {
    books.find((book) => {
      return book.id === searchBook.id;
    });
    return searchBook;
  });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" onClick={clearQuery}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(event) => {
              updateQuery(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {choosenBooks.map((book, index) => {
            return <Book key={index} book={book} updateShelf={updateShelf} shelf={book.shelf} />;
          })}
        </ol>
      </div>
    </div>
  );
};

export default Search;
