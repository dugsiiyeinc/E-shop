import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, getUserProfile, onAuthChange, sginOut } from "../lib/Auth";
import { getingCartsByUsedId } from "../lib/Cart";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartLength, setCartLength] = useState(0);
  const [itemsToOrderProcess, setItemsToOrderProcess] = useState([]);

  useEffect(() => {
    const cleanUp = onAuthChange(async (User) => {
      setUser(User);

      if (User) {
        try {
          const userProfile = await getProfile(User.id);
          console.log(userProfile)
          setProfile(userProfile);

          const userCarts = await getingCartsByUsedId(User.id);
          setCartLength(userCarts.length);
        } catch (error) {
          console.error("Error fetching user profile or cart:", error);
        }
      } else {
        setProfile(null);
        setCartLength(0);
      }

      setLoading(false);
    });

    return cleanUp;
  }, []);

  const logOutFun = async () => {
    try {
      await sginOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    setProfile,
    profile,
    user,
    loading,
    isLogged: !!profile,
    logOutFun,
    cartLength,
    setCartLength,
    itemsToOrderProcess,
    setItemsToOrderProcess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
