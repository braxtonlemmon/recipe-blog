import React, { createContext, useContext, useState, useEffect } from 'react';

const viewportContext = createContext({});

export const ViewportProvider = ({ children }) => {
  const isWindow = window !== 'undefined';

  const [width, setWidth] = useState(
    typeof isWindow ? window.innerWidth : null
  );
  const [height, setHeight] = useState(
    isWindow ? window.innerHeight : null
  );

  const handleWindowResize = () => {
    if (isWindow) {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  }

  useEffect(() => {
    if (isWindow) {
      window.addEventListener('resize', handleWindowResize);
    }
    return () => isWindow ? window.removeEventListener('resize', handleWindowResize) : null;
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  )
}

export const useViewport = () => {
  const { width, height } = useContext(viewportContext);
  return { width, height }
}