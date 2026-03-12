import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// We create a variable to hold the navigate function from React Router
let navigateFunction = null;

export const injectNavigate = (nav) => {
  navigateFunction = nav;
};

/* REQUEST INTERCEPTOR */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* RESPONSE INTERCEPTOR */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, config } = error.response;

      const isAuthRoute =
    config.url.includes("/login") || config.url.includes("/register");

      if (status === 401 && !isAuthRoute) {
        console.log("Session expired. Cleaning up...");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        if (navigateFunction) {
          navigateFunction("/login");
        } else {
          window.location.href = "/login";
        }
      }

      if (status === 500) {
        console.error("Server error:", error.response.data);
      }
    }

    return Promise.reject(error);
  },
);
export default api;
