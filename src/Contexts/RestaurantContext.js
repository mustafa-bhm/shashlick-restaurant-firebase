import { createContext, useState, useEffect, useContext } from "react";

const RestaurantContext = createContext({});

const RestaurantContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    // get current user and set it to user variable
  }, []);

  useEffect(() => {
    // fetch restaurant and filter by admin email
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;
export const useRestaurantContext = () => useContext(RestaurantContext);
