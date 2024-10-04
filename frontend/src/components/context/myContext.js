import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [refresher, setRefresher] = useState(true);
  const [userId, setUserId] = useState(0);

  return (
    <MyContext.Provider value={{ refresher, setRefresher, userId, setUserId }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
