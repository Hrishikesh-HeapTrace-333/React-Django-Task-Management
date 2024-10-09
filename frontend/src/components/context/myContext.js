import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [refresher, setRefresher] = useState(true);
  const [userId, setUserId] = useState(0);
  const [ numberOfTicketsAsPerStatus , setNumberOfTicketsAsPerStatus ] = useState([0,0,0]);
  return (
    <MyContext.Provider value={{ refresher, setRefresher, userId, setUserId, numberOfTicketsAsPerStatus , setNumberOfTicketsAsPerStatus }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
