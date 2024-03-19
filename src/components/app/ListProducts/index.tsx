'use clinet';
// IMPORTS
import Image from 'next/image';
import { useEffect, useState } from 'react';

// SERVICE
import { useProduct } from '@/context/ProductContext';
import { useQuery } from '@tanstack/react-query';
// COMPONENTS
import { useSystem } from '@/context/SystemContext';
import { capitalizeWords } from '@/utils/utils';
import { LoaderCircleIcon } from 'lucide-react';
import EmptyShoppingCart from '../../../../public/EmptyShoppingCart.svg';
import './styles.css';

export default function ListProducts() {
  const {
    getAllProduct,
    tabCategories,
    addToCart,
    getProductsFromCart,
  } = useProduct();

  const { data, isLoading } = useQuery({
    queryKey: ['getAllProduct'],
    queryFn: () => getAllProduct(),
  });

  const listProducts = data || []

  const { setIsOpenOrder } = useSystem();

  const [activeTab, setActiveTab] = useState('');
  const [visibleItemsCount, setVisibleItemsCount] = useState(6);

  const filteredAndVisibleItems = listProducts
    .filter((item) => activeTab === '' || item.category === activeTab)
    .slice(0, visibleItemsCount);
  console.log('filteredAndVisibleItems ', filteredAndVisibleItems);

  useEffect(() => {
    setVisibleItemsCount(6);
  }, [activeTab]);

  const loadMoreItems = () => {
    setVisibleItemsCount((prevCount) => prevCount + 3);
  };

  useEffect(() => {
    setIsOpenOrder(false);
    getProductsFromCart();
  }, []);

  if (isLoading) {
    return (
      <div className="center-loader">
        <LoaderCircleIcon className="icon-loader" />
      </div>
    );
  }

  return (
    <div className="main-header">
      {tabCategories.length !== 0 ? (
        <>
          <div className="tab-content">
            {tabCategories.map((item, index) => (
              <div
                key={index}
                className={`tab ${activeTab === item && 'active'}`}
                onClick={() => setActiveTab(activeTab === item ? '' : item)}
              >
                <p>{capitalizeWords(item)}</p>
              </div>
            ))}
          </div>

          <div className="card-content">
            {filteredAndVisibleItems.map((item, index) => (
              <div key={index} className="card">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={132}
                  height={132}
                />

                <h2>{capitalizeWords(item.title)}</h2>
                <p>$ {item.price}</p>

                <div className="rating-content">
                  <div className="rating-stars">
                    {[...Array(5)].map((star, index) => {
                      const ratingValue = index + 1;
                      return (
                        <span
                          key={index}
                          className={`star ${
                            ratingValue <= item.rating.rate ? 'filled' : ''
                          }`}
                        >
                          &#9733;
                        </span>
                      );
                    })}
                  </div>

                  <p> {item.rating.rate}</p>
                </div>

                <button type="button" onClick={() => addToCart(item)}>
                  Add to cart
                </button>
              </div>
            ))}
          </div>

          {visibleItemsCount < listProducts.length && (
            <button onClick={loadMoreItems}>Carregar +</button>
          )}
        </>
      ) : (
        <div className="main-empty">
          <Image
            src={EmptyShoppingCart}
            alt="Empty Shopping Cart"
            width={132}
            height={132}
          />
          <p>There are no products listed</p>
        </div>
      )}
    </div>
  );
}
