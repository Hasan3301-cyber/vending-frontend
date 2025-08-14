import orderCoverImg from "../../../assets/library1.jpg";
import Cover from "../../Shared/Cover/Cover";

import book1 from "../../../assets/book1.png";
import book2 from "../../../assets/book2.jpg";
import book3 from "../../../assets/book3.jpeg";
import book4 from "../../../assets/book4.jpg";
import book5 from "../../../assets/book5.jpg";
import book6 from "../../../assets/book6.png";
import useAuth from "../../../hooks/Hook/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import useCart from "../../../hooks/Hook/useCart";

const books = [
  {
    title: "The Art of Code",
    image: book1,
    price: 20,
    description: "Master the fundamentals of clean and efficient programming.",
  },
  {
    title: "Mysteries of Space",
    image: book2,
    price: 18,
    description: "Explore the vast unknown of the cosmos and beyond.",
  },
  {
    title: "History Unfolded",
    image: book3,
    price: 15,
    description: "Dive deep into historical events that shaped the world.",
  },
  {
    title: "Nature's Wonders",
    image: book4,
    price: 22,
    description: "Discover the beauty and secrets of nature around us.",
  },
  {
    title: "Deep Dive into AI",
    image: book5,
    price: 25,
    description: "Understand how artificial intelligence is changing the world.",
  },
  {
    title: "The World of Design",
    image: book6,
    price: 19,
    description: "A guide to modern design thinking and creativity.",
  },
];

const Order = () => {
  const { user } = useAuth();
  const [, refetch] = useCart();

  const handleOrder = async (book) => {
    if (!user) {
      Swal.fire("Please log in to add items to the cart");
      return;
    }

    const cartItem = {
      title: book.title,
      email: user.email,
      price: book.price,
      image: book.image,
    };

    try {
      const { data } = await axios.post("http://localhost:5000/carts", cartItem);
      console.log("Saved to cart:", data);
      Swal.fire("Success", "Book added to cart!", "success");
      refetch();
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire("Error", "Failed to add to cart", "error");
    }
  };

  return (
    <div>
      <Cover img={orderCoverImg} title="Order Book" />

      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {books.map((book, index) => (
          <div
            key={index}
            className="card card-compact w-80 h-120 bg-base-100 shadow-xl transform transition duration-300 hover:scale-110 hover:shadow-2xl"
          >
            <figure>
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.title}</h2>
              <p className="text-gray-600 mb-1">{book.description}</p>
              <p className="text-lg font-semibold">Price: ${book.price}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleOrder(book)}
                  className="btn btn-primary transition duration-300 hover:bg-blue-600 hover:scale-110"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
