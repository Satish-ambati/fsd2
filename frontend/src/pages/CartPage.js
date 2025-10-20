import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Cart from '../components/Cart';

function CartPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const placeOrder = async () => {
    if (!user) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    if (!address) {
      alert('Please enter shipping address');
      return;
    }

    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const token = localStorage.getItem('token');
      
      await axios.post('http://localhost:5000/api/orders', {
        userId: user._id, // Use actual user ID from auth
        products: cart,
        totalAmount,
        shippingAddress: address,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Order placed successfully!');
      setCart([]);
      localStorage.removeItem('cart');
      navigate('/order-confirmation');
    } catch (err) {
      alert('Error placing order');
    }
  };

  return (
    <div className="cart-page">
      <Cart cart={cart} removeFromCart={removeFromCart} placeOrder={placeOrder} />
      <div className="shipping">
        <h3>Shipping Address</h3>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your complete shipping address"
        />
      </div>
    </div>
  );
}

export default CartPage;