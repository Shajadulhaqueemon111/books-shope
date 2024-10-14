import { useEffect, useState } from "react";
import "./style.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    fetch("https://gutendex.com/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (books.length === 0) {
    return <p>No books available</p>;
  }

  // Filter the books based on the search term
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.some((author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Calculate total pages based on filteredBooks length
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Get the books for the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-center">Book List</h1>

      {/* Search Input */}
      <div className="text-center mb-5">
        <input
          type="text"
          placeholder="Search books by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 rounded p-2 w-1/2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto w-full">
        {currentBooks.map((book) => (
          <div
            className="card-style mx-auto"
            key={book.id}
            style={{ marginBottom: "20px" }}
          >
            {book.formats["image/jpeg"] && (
              <img
                className="mx-auto"
                src={book.formats["image/jpeg"]}
                alt={`${book.title} cover`}
                style={{ width: "150px" }}
              />
            )}
            <h2 className="text-center">{book.title}</h2>
            <p className="text-center">
              <span className="font-bold">Author:</span>{" "}
              {book.authors.map((author) => author.name).join(", ")}
            </p>
            <p className="text-center">
              <strong>Subjects:</strong>{" "}
              {book.subjects ? book.subjects.join(", ") : "N/A"}
            </p>

            {book.formats["text/html"] && (
              <a
                className="text-center block mt-2"
                href={book.formats["text/html"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Online
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls text-center mt-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookList;
