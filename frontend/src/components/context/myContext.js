import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [refresher, setRefresher] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userId, setUserId] = useState(0);

  return (
    <MyContext.Provider value={{ refresher, setRefresher, isSidebarOpen, setIsSidebarOpen, userId, setUserId }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
