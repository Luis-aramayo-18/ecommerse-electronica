import { useId } from "react"

import "./Cart.css"
import { useCart } from "./Hooks/useCart"

function CartItem ({ image, price, name, quantity, addToCart }) {
    return (
      <li>
        <img
          src={image}
          alt={name}
        />
        <div>
          <strong>{name}</strong> - ${price}
        </div>
  
        <footer>
          <small>
            Qty: {quantity}
          </small>
          <button onClick={addToCart}>+</button>
        </footer>
      </li>
    )
  }
  
  export function Cart () {
    const cartCheckboxId = useId()
    const { cart, clearCart, addToCart } = useCart()
  
    return (
      <>
        <label className='cart-button' htmlFor={cartCheckboxId}>
          Carrito{cart.length}
        </label>
        <input id={cartCheckboxId} type='checkbox' hidden />
  
        <aside className='cart'>
          <ul>
            {cart.map(product => (
              <CartItem
                key={product.id}
                addToCart={() => addToCart(product)}
                {...product}
              />
            ))}
          </ul>
  
          <button onClick={clearCart}>
            Borrar
          </button>
        </aside>
      </>
    )
  }

export default Cart