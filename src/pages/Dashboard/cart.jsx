import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../hooks/Hook/useCart";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/carts/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Book removed from cart.", "success");
            }
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire("Error", "Could not delete item", "error");
          });
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Summary Box */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-gradient-to-r from-blue-50 via-purple-100 to-blue-50 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Items: <span className="text-blue-600">{cart.length}</span>
          </h2>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Total:{" "}
            <span className="text-green-600">${totalPrice.toFixed(2)}</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 justify-center md:justify-end">
          <Link to="/order">
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300">
              📚 Add Book
            </button>
          </Link>

          <Link to="/dashboard/payment">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300">
              💳 Pay
            </button>
          </Link>
        </div>
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        {cart.length > 0 ? (
          <table className="table w-full">
            <thead className="bg-blue-100 text-gray-800 text-lg">
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-blue-50 transition duration-300"
                >
                  <td className="font-semibold">{index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-14 h-14 overflow-hidden border-2 border-white shadow-md transition-transform duration-300 hover:scale-105">
                        <img src={item.image} alt={item.title} />
                      </div>
                    </div>
                  </td>
                  <td className="font-medium text-gray-800">{item.title}</td>
                  <td className="text-green-600 font-semibold">
                    ${item.price}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-white hover:bg-red-500 border border-red-400 px-3 py-2 rounded-lg transition duration-200"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-20 text-gray-600">
            <h3 className="text-2xl mb-4">🛒 Your cart is empty!</h3>
            <Link to="/order">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">
                Browse Books
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
