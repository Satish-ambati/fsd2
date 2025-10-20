function Cart({ cart, removeFromCart, placeOrder }) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.product._id} className="cart-item">
              <h4>{item.product.name}</h4>
              <p>Price: ${item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
          <button onClick={placeOrder}>Place Order (COD)</button>
        </>
      )}
    </div>
  );
}

export default Cart;