import { useState, createContext } from 'react';

const Context = createContext();

const AppProvider = ({children}) => {
  const [ failedQRId, setFailedQRId ] = useState([])
  return (
    <Context.Provider 
      value={{
        failedQRId, setFailedQRId,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { AppProvider, Context };