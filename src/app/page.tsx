'use client';

import Header from '@/components/app/Header';
import ListProducts from '@/components/app/ListProducts';
import ShoppingCart from '@/components/app/ShoppingCart';
import { useSystem } from '@/context/SystemContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './page.css';

export default function Home() {
  const { isOpenOrder } = useSystem();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <main className="main">
          <Header />
          <ListProducts />
        </main>
        {isOpenOrder && <ShoppingCart />}
      </div>
    </QueryClientProvider>
  );
}
