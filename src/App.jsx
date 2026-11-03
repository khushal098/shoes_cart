import { useState } from "react";
import "./App.css";

const SHOES = [
  { id: 1, name: "White Casual Sneaker", price: 70, image: "images/white-casual-sneaker.jpeg" },
  { id: 2, name: "MACTREE Men's Mid Top Ankle Boots", price: 90, image: "images/mactree-boots.jpeg" },
  { id: 3, name: "Campus Men's Sneakers", price: 50, image: "images/139405440.jpeg" },
  { id: 4, name: "Campus Men's OG-03 Sneakers", price: 75, image: "images/campus-og-03.jpeg" },
  { id: 5, name: "ASIAN Men's Sports Shoes", price: 68, image: "images/asian-thar-13.jpeg" },
  { id: 6, name: "ASIAN Mens Thar-13 Sneaker", price: 120, image: "images/asian-sports-shoes.jpeg" },
  { id: 7, name: "ASIAN Men's AIRWEAVE-02 Sports Shoes", price: 40, image: "images/campus-sneakers.jpeg" },
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === shoe.id);
      if (existing) {
        return prev.map((item) =>
          item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...shoe, quantity: 1 }];
    });
  };


  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">S</div>
        <a href="#home">Home</a>
        <a href="#categories">Categories</a>
        <a href="#about">About Us</a>
      </nav>

      <main className="layout">
        <section className="shoe-list">
          {SHOES.map((shoe) => (
            <article className="shoe-card" key={shoe.id}>
              <img src={shoe.image} alt={shoe.name} />
              <div className="shoe-info">
                <h3>{shoe.name}</h3>
                <p>${shoe.price}</p>
                <button onClick={() => addToCart(shoe)}>Add to Cart</button>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart">
          <h2>Cart</h2>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>
              <div className="qty">
                <button onClick={() => removeFromCart(item.id)} aria-label="Decrease quantity">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)} aria-label="Increase quantity">+</button>
              </div>
            </div>
          ))}
          <h3 className="total">Total: ${total.toFixed(2)}</h3>
        </aside>
      </main>
    </div>
  );
}
