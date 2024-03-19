'use client';

// IMPORTS
import { ReactNode, createContext, useContext, useState } from 'react';

interface SystemContextData {
  isOpenOrder: boolean;
  setIsOpenOrder: (value: boolean) => void;
}

const SystemContext = createContext<SystemContextData>({
  isOpenOrder: false,

  setIsOpenOrder: () => {},
});

function SystemProvider({ children }: { children: ReactNode }) {
  const [isOpenOrder, setIsOpenOrder] = useState(false);

  return (
    <SystemContext.Provider
      value={{
        isOpenOrder,
        setIsOpenOrder,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

const useSystem = () => useContext(SystemContext);

export { SystemProvider, useSystem };

