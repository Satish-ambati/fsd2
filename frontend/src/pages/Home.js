import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter products based on search term
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = existingCart.find(item => item.product._id === product._id);
    
    if (existingItem) {
      // Update quantity if item already exists
      const updatedCart = existingCart.map(item =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Add new item to cart
      const newCart = [...existingCart, { product, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
    
    alert(`${product.name} added to cart!`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading medicines...</div>;
  }

  return (
    <div className="home">
      <h2>Medicines & Healthcare Products</h2>
      
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search medicines and healthcare products..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="search-info">
          <p>
            Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} 
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>
      )}

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <div className="no-products">
            <p>No products found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;