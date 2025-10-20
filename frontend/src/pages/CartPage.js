import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cart from '../components/Cart';

function CartPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [address, setAddress] = useState('');
  const history = useHistory();

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const placeOrder = async () => {
    if (!address) {
      alert('Please enter shipping address');
      return;
    }
    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      await axios.post('http://localhost:5000/api/orders', {
        userId: 'user-id-placeholder', // Replace with actual user ID after login
        products: cart,
        totalAmount,
        shippingAddress: address,
      });
      alert('Order placed successfully!');
      setCart([]);
      localStorage.removeItem('cart');
      history.push('/order-confirmation');
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
          placeholder="Enter your shipping address"
        />
      </div>
    </div>
  );
}

export default CartPage;