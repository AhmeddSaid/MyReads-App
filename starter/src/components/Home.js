import { Link } from "react-router-dom";
import "../App.css";
import Book from "./Book";

const Home = (props) => {
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
    },
  ];
  console.log(props);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((currentShelf, key) => (
            <div className="bookshelf" key={key}>
              <h2 className="bookshelf-title">{currentShelf.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {props.books
                    .filter((book) => book.shelf === currentShelf.name)
                    .map((book) => (
                      <li key={book.id}>
                        <Book book={book} updateShelf={props.updateShelf} shelf={currentShelf.name} />
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" />
      </div>
    </div>
  );
};

export default Home;
