import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import { API_BASE_URL } from './apiConfig'; // Import the centralized config

const MACHINE_ID = "vending-machine-01"; // Or get this dynamically if you have multiple machines

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products from the server when the component loads
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => {
        console.error("Error fetching products:", err);
        Swal.fire('Connection Error', 'Could not fetch products from the server.', 'error');
      });
  }, []);

  // Handle the purchase button click
  const handlePurchase = (product) => {
    setIsLoading(true);
    
    fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.productId, machineId: MACHINE_ID }),
    })
    .then(res => res.json())
    .then(data => {
      setIsLoading(false);
      if (data.orderId) {
        // Display payment instructions clearly to the user
                Swal.fire({
          title: 'Order Created!',
          html: `To receive your code, please pay <b>exactly ${product.price.toFixed(2)} Taka</b> to bKash number <b>01608314796</b>.<br/><br/>Your code will be sent via SMS automatically after payment.`,
          icon: 'info',
          confirmButtonText: 'Got It!'
        });
      } else {
        Swal.fire('Error', data.message || 'Could not create the order.', 'error');
      }
    })
    .catch(err => {
      setIsLoading(false);
      console.error("Error creating order:", err);
      Swal.fire('Server Error', 'Could not connect to the server to create the order.', 'error');
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Vending Machine</h1>
        <p className="text-lg text-gray-600">Select a product to purchase</p>
      </div>

      {products.length === 0 ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.productId} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
              <img src={`/src/assets/${product.image}`} alt={product.name} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-700 font-bold text-2xl mt-2">{product.price.toFixed(2)} Taka</p>
                <button
                  onClick={() => handlePurchase(product)}
                  disabled={isLoading}
                  className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400"
                >
                  {isLoading ? 'Processing...' : 'Purchase'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
       <div className="mt-8 text-center">
        <a href="/checkout" className="text-blue-600 hover:underline">
          Already have a code? Go to Checkout
        </a>
      </div>
    </div>
  );
}

export default App;