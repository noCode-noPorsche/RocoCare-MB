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
      async (config) => {
        const token = await getAccessTokenFromLS();
        console.log(token, "TokenHttp");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
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
