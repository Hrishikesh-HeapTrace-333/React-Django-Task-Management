import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [refresher, setRefresher] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <MyContext.Provider value={{ refresher, setRefresher, isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
