import React, { useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

const Search = ({ books, updateShelf }) => {
  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);

  const updateQuery = (query) => {
    if (query.length !== 0) {
      // if query is empty, clear query
      setQuery(query.trim()); // trim white spaces from query
      BooksAPI.search(query, 10).then((resultBooks) => {
        // search = (query, maxResults)
        setSearchBooks(resultBooks.error ? [] : resultBooks);
      });
    } else {
      setSearchBooks([]);
    }
  };

  /*   const clearQuery = () => {
    updateQuery("");
  }; */

  let choosenBooks = searchBooks.map((searchBook) => {
    const alreadyStoredBook = books.find((book) => {
      return book.id === searchBook.id;
    });
    searchBook.shelf = alreadyStoredBook ? alreadyStoredBook.shelf : "none"; // if book already owned don't add it to shelves
    return searchBook;
  });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" np>
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
