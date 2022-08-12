import { setTokens } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import { getRefreshToken } from "../api/refreshToken";
import axios from "../api/axiosPublic";
const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const refresh = async (): Promise<string> => {
    return await new Promise((resolve, reject) => {
      axios
        .post("/auth/jwt/refresh/", {
          refresh: `${getRefreshToken()}`,
        })
        .then((res) => {
          dispatch(setTokens({ accessToken: res.data.access }));
          resolve(res.data.access);
        })
        .catch((err) => {
          console.log(err);
          reject(err.response.data);
        });
    });
  };
  return refresh;
};

export default useRefreshToken;
