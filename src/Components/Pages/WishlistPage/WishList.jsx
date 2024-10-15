import { useEffect, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const WishList = () => {
  const [wishListBooks, setWishListBooks] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const books = [];

    keys.forEach((key) => {
      if (key.startsWith("book-")) {
        const bookData = JSON.parse(localStorage.getItem(key));
        books.push(bookData);
      }
    });

    setWishListBooks(books);
  }, []);

  const handleDelete = (id) => {
    // Remove the book from localStorage
    localStorage.removeItem(`book-${id}`);

    const updatedBooks = wishListBooks.filter((book) => book.id !== id);
    setWishListBooks(updatedBooks);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl bg-indigo-700 font-bold text-center">Wish List</h1>

      {wishListBooks.length === 0 ? (
        <p>No books in the wishlist.</p>
      ) : (
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {wishListBooks.map((book) => (
            <div
              className="card-style border border-gray-300 rounded-lg p-4"
              key={book.id}
            >
              {book.coverImage && (
                <img
                  className="mx-auto"
                  src={book.coverImage}
                  alt={`${book.title} cover`}
                  style={{
                    width: "150px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              )}
              <h2 className="text-center mt-2">{book.title}</h2>
              <p className="text-center">
                <span className="font-bold">Author:</span>
                {Array.isArray(book.authors)
                  ? book.authors.join(", ")
                  : book.authors}
              </p>
              <p className="text-center">
                <strong>Subjects:</strong> {book.subjects.join(", ")}
              </p>

              <div className="mx-auto text-center items-center">
                <button onClick={() => handleDelete(book.id)}>
                  <MdOutlineDeleteForever className="text-2xl text-red-600 font-bold" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
