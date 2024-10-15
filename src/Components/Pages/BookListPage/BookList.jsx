import { useEffect, useState } from "react";
import "./style.css";
import { AiOutlineLike } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";
import AOS from "aos";
import "aos/dist/aos.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  //animation
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
  useEffect(() => {
    fetch("https://gutendex.com/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p>
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </p>
    );
  }

  if (books.length === 0) {
    return <p>No books available</p>;
  }

  // Filter  books based on the search  and selected genre
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesAuthor = book.authors.some((author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesGenre =
      selectedGenre === "All" ||
      (book.subjects && book.subjects.includes(selectedGenre));

    return (matchesTitle || matchesAuthor) && matchesGenre;
  });

  const genres = Array.from(new Set(books.flatMap((book) => book.subjects)));

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSaveToLocalStorage = (book) => {
    const bookData = {
      id: book.id,
      title: book.title,
      authors: book.authors.map((author) => author.name).join(", "),
      subjects: book.subjects,
      coverImage: book.formats["image/jpeg"],
      readLink: book.formats["text/html"],
    };
    console.log(bookData);

    localStorage.setItem(`book-${book.id}`, JSON.stringify(bookData));

    alert(`Book "${book.title}" saved to localStorage!`);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-center">Book List</h1>

      <div className="text-center mb-5">
        <input
          type="text"
          placeholder="Search books by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 rounded p-2 w-1/2 mb-4"
        />

        {/* Genre Dropdown */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border border-gray-400 rounded p-2 ml-2"
        >
          <option value="All">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div
        data-aos="fade-up"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto w-full"
      >
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
              {book.subjects ? book.subjects.join(", ") : ""}
            </p>

            <p className="text-xl font-bold text-center">ID: {book.id}</p>
            {/* like Section */}
            <div className="w-full mx-auto text-center">
              <button
                onClick={() => handleSaveToLocalStorage(book)}
                className=" like"
              >
                <AiOutlineLike className="text-2xl  text-blue-600 font-bold"></AiOutlineLike>
              </button>
            </div>
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
