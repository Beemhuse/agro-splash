import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

// const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export default function init(): void {
//   axios.defaults.baseURL = API_URL;
  axios.defaults.withCredentials = false;

  // Retrieve tokens from cookies
  // const accessToken = cookies.get("nw_token");
  const refreshToken = cookies.get("nw_refresh");

  // Set default Authorization header if access token exists
//   if (accessToken) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//   }

  // Add response interceptor for handling token expiration
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        // Check if refresh token is available
        if (refreshToken) {
          try {
            // Attempt to refresh the access token
            const { data } = await axios.post<{ entity: { access_token: string } }>(
              "/auth/refresh", // Replace with your refresh token endpoint
              { token: refreshToken }
            );

            const newAccessToken = data.entity.access_token;

            // Update Authorization header with the new token
            axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

            // Save the new access token in cookies
            cookies.set("nw_token", newAccessToken, { path: "/" });

            // Retry the original request with the new token
            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axios(error.config);
          } catch (refreshError) {
            // If refreshing fails, remove cookies and redirect to login
            // cookies.remove("nw_token");
            // cookies.remove("nw_refresh");
            // window.location.href = "/a/login";
            return Promise.reject(refreshError);
          }
        } else {
          // No refresh token; redirect to login
        //   cookies.remove("nw_token");
        //   cookies.remove("nw_refresh");
        //   window.location.href = "/a/login";
        }
      }

      return Promise.reject(error);
    }
  );
}
