import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState  ([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, { product, quantity: 1 }]);
  };

  if (loading) {
    return <div className="loading">Loading medicines...</div>;
  }

  return (
    <div className="home">
      <h2>Medicines & Healthcare Products</h2>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product._id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
export default Home;