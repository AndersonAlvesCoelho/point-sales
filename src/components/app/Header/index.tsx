'use client';

import { useSystem } from '@/context/SystemContext';
import { delay, scrollToSection } from '@/utils/utils';
import { ShoppingBagIcon } from 'lucide-react';
import Image from 'next/image';
import Logo from '../../../../public/logo.png';
import './styles.css';

export default function Header() {
  const { isOpenOrder, setIsOpenOrder } = useSystem();

  async function handleAction() {
    setIsOpenOrder(!isOpenOrder);
    await delay(200);

    scrollToSection('section-order');
  }

  return (
    <header className="header">
      <div className="logo">
        <Image src={Logo} alt="Logo Vintage PDV" />
        <h1 className="title-logo">Vintage PDV</h1>
      </div>

      <button type="button" onClick={handleAction}>
        <ShoppingBagIcon className="icon" />
      </button>
    </header>
  );
}
