'use client';

import { ProductProps } from '@/@types/product.type';
import { useProduct } from '@/context/ProductContext';
import { MinusIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import './styles.css';

import EmptyShoppingCart from '../../../../public/EmptyShoppingCart.svg';

export default function ShoppingCart() {
  const { productsCart, adjustProductQuantity } = useProduct();

  function calculateTotalQuantity(products: ProductProps[]) {
    return products.reduce(
      (total, product) => total + (product.quantity ?? 0),
      0
    ).toFixed(2);
  }

  function calculateTotalPrice(products: ProductProps[]) {
    return products.reduce((total, product) => total + product.price, 0).toFixed(2);
  }

  return (
    <div className="shopping-cart-container">
      {productsCart.length !== 0 ? (
        <div className="shopping-cart-content" id="section-order">
          <h1>Orders</h1>
          <div className="shopping-cart-header">
            <p>Item</p>
            <p>Qty</p>
            <p>Price</p>
          </div>
          <div className="shopping-cart-order-content">
            {productsCart.map((item, index) => (
              <div key={index} className="shopping-cart-order">
                <div className="shopping-cart-item">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={45}
                    height={45}
                  />
                  <div className="shopping-cart-info">
                    <p>{item.title}</p>
                    <p>$ {item.price}</p>
                  </div>
                </div>
                <div className="shopping-cart-action">
                  <p>{item?.quantity}</p>
                  <button
                    type="button"
                    onClick={() => adjustProductQuantity(item.id, -1)}
                  >
                    <MinusIcon className="shopping-cart-icon" />
                  </button>
                </div>
                <div className="shopping-cart-action">
                  <p>$ {(item?.quantity ?? 0) * item.price}</p>
                  <button
                    type="button"
                    onClick={() => adjustProductQuantity(item.id, 1)}
                  >
                    <PlusIcon className="shopping-cart-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="shopping-cart-summary">
            <div className="shopping-cart-summary-info">
              <p>Total Items</p>
              <p>{calculateTotalQuantity(productsCart)}</p>
            </div>

            <div className="shopping-cart-summary-info">
              <p>Sub total</p>
              <p>$ {calculateTotalPrice(productsCart)}</p>
            </div>

            <button>Continue to Payment</button>
          </div>
        </div>
      ) : (
        <div className="shopping-cart-empty">
          <Image
            src={EmptyShoppingCart}
            alt="Empty Shopping Cart"
            width={132}
            height={132}
          />
          <p>Your shopping cart is empty</p>
        </div>
      )}
    </div>
  );
}
