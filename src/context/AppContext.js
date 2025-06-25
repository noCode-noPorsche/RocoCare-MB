import { createContext, useEffect, useState } from "react";
import { clearLS, getAccessTokenFromLS, getProfileFromLS } from "../utils/auth";
import authApi from "../apis/AuthApi";

const initialAppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
};

export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialAppContext.isAuthenticated
  );
  const [profile, setProfile] = useState(initialAppContext.profile);

  const reset = () => {
    setIsAuthenticated(false);
    setProfile(null);
    clearLS();
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = getAccessTokenFromLS();

      if (token) {
        try {
          const response = await authApi.profile();
          setProfile(response.data.data);
          setIsAuthenticated(true);
        } catch (err) {
          console.log("❌ Lỗi khi load profile: ", err);
          reset(); // Token sai thì xoá
          setIsAuthenticated(false);
        }
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
