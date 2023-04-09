import jwt_decode from "jwt-decode";
import axios from "axios";

export default function axiosJWT(currentUser, refreshAccessToken) {
  const refreshToken = async () => {
    try {
      const res = await axios.post("api/auth/refreshtoken");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();

      const decodedToken = jwt_decode(currentUser.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Het han")
        const newAccessToken = await refreshToken();
        refreshAccessToken(newAccessToken.toString());

        config.headers["authorization"] = "Bearer " + newAccessToken.toString();
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosJWT;
}
