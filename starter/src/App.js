import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Home from "./components/Home";
import Search from "./components/Search";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let search = false;

    const getBooks = async () => {
      if (!search) {
        const res = await BooksAPI.getAll(); // get Books Data from BooksAPI
        setBooks(books.concat(res));
      }
    };
    getBooks();
    return () => {
      search = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateShelf = (book, shelf) => {
    // change book state to move between shelves
    book.shelf = shelf;
    setBooks(books.filter((b) => b.id !== book.id).concat(book));
  };

  return (
    <Routes>
      <Route exact path={"/"} element={<Home books={books} updateShelf={updateShelf} />} />
      <Route exact path={"/search"} element={<Search books={books} updateShelf={updateShelf} />} />
    </Routes>
  );
}

export default App;
