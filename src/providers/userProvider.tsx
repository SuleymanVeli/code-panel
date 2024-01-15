import React from 'react';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext({});

export const UserProvider = ({children}:{children:JSX.Element}): JSX.Element => {
  const [user, setUser] = useState<any>();

  return (
    <UserContext.Provider
      value={{              
        user,
        setUser,    
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): any => {
  return useContext(UserContext);
};
