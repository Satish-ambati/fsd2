function ProductCard({ product, addToCart }) {
  // Default medical product image if no image is provided
  const defaultImage = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image-container">
        <img 
          src={product.image || defaultImage} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = defaultImage; // Fallback if image fails to load
          }}
        />
        {product.stock === 0 && (
          <div className="out-of-stock-overlay">
            <span>Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-meta">
          <p className="price">${product.price}</p>
          <p className={`stock ${product.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>

        <button 
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;