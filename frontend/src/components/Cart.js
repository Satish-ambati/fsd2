function Cart({ cart, removeFromCart, placeOrder }) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p>Add some medicines to get started!</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.product._id} className="cart-item">
              <div className="item-details">
                <h4>{item.product.name}</h4>
                <p>Price: ${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
              <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="place-order-btn" onClick={placeOrder}>
              Place Order (COD)
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default Cart;