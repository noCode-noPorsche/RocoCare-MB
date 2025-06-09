import axios from "axios";
import { getAccessTokenFromLS } from "./auth";

class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: "https://robocare.ai.vn/api",
      timeout: 3000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // this.instance.interceptors.response.use((response) => {
    //   const { url } = response.config
    //   if (url === pathAPI.loginWithGoogle || url === path.register) {
    //     const data = response.data
    //     this.accessToken = data.data.token
    //     setAccessTokenToLS(this.accessToken)
    //     setProfileToLS(data.data.userResponse)
    //   } else if (url === path.logout) {
    //     this.accessToken = ''
    //     clearLS()
    //   }
    //   return response
    // })
  }
}

const http = new Http().instance;

export default http;
