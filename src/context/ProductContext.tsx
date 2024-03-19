'use client';

import { ProductProps } from '@/@types/product.type';
import api from '@/service/api';
// IMPORTS
import { ReactNode, createContext, useContext, useState } from 'react';

interface ProductContextData {
  tabCategories: string[] | [];
  productsCart: ProductProps[] | [];

  getAllProduct: () => Promise<ProductProps[] | []> 
  getProductsFromCart: () => void;
  addToCart: (product: ProductProps) => void;
  adjustProductQuantity: (productId: number, adjustment: number) => void;
}

const ProductContext = createContext<ProductContextData>({
  tabCategories: [],
  productsCart: [],

  getAllProduct: () => Promise.resolve([]),
  getProductsFromCart: () => {},
  addToCart: () => {},
  adjustProductQuantity: () => {},
});

function ProductProvider({ children }: { children: ReactNode }) {
  const [productsCart, setProductsCart] = useState<ProductProps[] | []>([]);
  const [tabCategories, setTabCategories] = useState<string[] | []>([]);

  async function getAllProduct(): Promise<ProductProps[] | []> {
    const response = await api.get<ProductProps[]>('/products');
    const { data, status } = response;
    if (status === 200 && data.length !== 0) {
      const categories = response.data.map((product) => product.category);
      const uniqueCategories = Array.from(new Set(categories));
      setTabCategories(uniqueCategories);
    }
    return response.data ?? [];
  }

  function addToCart(product: ProductProps) {
    try {
      const cartJSON = localStorage.getItem('cart');
      const cart: ProductProps[] = cartJSON ? JSON.parse(cartJSON) : [];

      const index = cart.findIndex((item) => item.id === product.id);

      if (index !== -1) {
        cart[index].quantity = (cart[index].quantity || 0) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      setProductsCart(cart);
    } catch (error) {
      console.log('error ', error);
    }
  }

  function getProductsFromCart() {
    const cartJSON = localStorage.getItem('cart');
    setProductsCart(cartJSON ? JSON.parse(cartJSON) : []);
  }

  function adjustProductQuantity(productId: number, adjustment: number) {
    const cartJSON = localStorage.getItem('cart');
    let cart: ProductProps[] = cartJSON ? JSON.parse(cartJSON) : [];

    const productIndex = cart.findIndex((product) => product.id === productId);

    if (productIndex !== -1) {
      const newQuantity = (cart[productIndex].quantity ?? 0) + adjustment;

      if (newQuantity > 0) {
        cart[productIndex].quantity = newQuantity;
      } else {
        cart.splice(productIndex, 1);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
    }
    setProductsCart(cart);
  }

  return (
    <ProductContext.Provider
      value={{
        tabCategories,
        productsCart,

        getAllProduct,
        getProductsFromCart,
        adjustProductQuantity,
        addToCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };

