import axios from "axios";

export default function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(window.localStorage.getItem("token"));
    const hasAdminToken = Boolean(window.localStorage.getItem("adminToken"));
    console.log(window.localStorage.getItem("adminToken"));
    if (hasToken || hasAdminToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${
          window.localStorage.getItem("token") ||
          window.localStorage.getItem("adminToken")
        }`,
      };
    }
    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      const hasToken = Boolean(window.localStorage.getItem("token"));
      const hasAdminToken = Boolean(window.localStorage.getItem("adminToken"));
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        if (hasToken) {
          window.localStorage.removeItem("token");
          window.location.replace("/login");
        } else if (hasAdminToken) {
          window.localStorage.removeItem("adminToken");
          window.location.replace("/admin");
        }
      } else if (error.response.status === 403) {
        window.history.back();
      }
    }
  );
}
