import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

import "./styles.css";

const BookDetails = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://gutendex.com/books")
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setBooks(data.results);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  if (books.length === 0) {
    return <p>No book details available</p>;
  }

  return (
    <div>
      <h1>Book Details</h1>
      <div className="book-list grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {books.map((book) => (
          <div key={book.id} className="bookcard-style mx-auto">
            {book.formats["image/jpeg"] && (
              <img
                className="mx-auto"
                src={book.formats["image/jpeg"]}
                alt={`${book.title} cover`}
              />
            )}
            <h1 className="text-center">{book.title}</h1>
            <p className="text-center">
              Author: {book.authors?.map((author) => author.name).join(", ")}
            </p>
            <p className="text-center">
              Subjects: {book.subjects ? book.subjects.join(", ") : "N/A"}
            </p>
            <p className="text-center">
              Bookshelves:{" "}
              {book.bookshelves ? book.bookshelves.join(", ") : "N/A"}
            </p>
            {book.formats["text/html"] && (
              <a
                className="text-center"
                href={book.formats["text/html"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-center">Read Online</p>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
