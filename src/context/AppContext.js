import { createContext, useEffect, useState } from "react";
import { clearLS, getAccessTokenFromLS, getProfileFromLS } from "../utils/auth";
import authApi from "../apis/AuthApi";

const initialAppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
  emergencyContacts: {
    phoneNumber1: "",
    phoneNumber2: "",
  },
  setEmergencyContacts: () => null,
};

export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialAppContext.isAuthenticated
  );
  const [profile, setProfile] = useState(initialAppContext.profile);

  const [emergencyContacts, setEmergencyContacts] = useState({
    phoneNumber1: "",
    phoneNumber2: "",
  });

  const reset = () => {
    setIsAuthenticated(false);
    setEmergencyContacts({
      phoneNumber1: "",
      phoneNumber2: "",
    });
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
        emergencyContacts,
        setEmergencyContacts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
