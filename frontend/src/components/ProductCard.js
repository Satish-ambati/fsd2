function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <p className="stock">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
      <button 
        onClick={() => addToCart(product)}
        disabled={product.stock === 0}
      >
        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}

export default ProductCard;