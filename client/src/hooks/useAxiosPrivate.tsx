import axiosPrivate from "../api/axiosPrivate";
import { useEffect, useState } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { setLoading, setError } from "../features/core/coreSlice";
import { AxiosError, AxiosRequestConfig } from "axios";
import { RootState } from "../app/store";
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const dispatch = useAppDispatch();
  const axios = axiosPrivate;
  const { auth } = useAppSelector((state: RootState) => state.auth);
  const [loading, setLoadingLocal] = useState(false);
  const [error, setErrorLocal] = useState<any>(null);
  const setLoadingFunction = (loading: boolean) => {
    setLoadingLocal(loading);
    dispatch(setLoading(loading));
  };
  const setErrorFunction = (error: AxiosError) => {
    setErrorLocal(error.response?.data);
    dispatch(setError(error.response?.data));
  };
  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        setLoadingFunction(true);
        if (config.headers === undefined) {
          config.headers = {};
        }
        if (!config.headers["Authorization"] && auth.accessToken !== null) {
          config.headers.Authorization = `JWT ${auth.accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = axios.interceptors.response.use(
      (response) => {
        setLoadingFunction(false);
        return response;
      },
      async (error: any) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            setLoadingFunction(true);
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `JWT ${newAccessToken}`;
            return axios(prevRequest);
          } catch (error: any) {
            setLoadingFunction(false);
            setErrorFunction(error);
            return Promise.reject(error);
          }
        } else if (error?.response?.status === 401 && prevRequest.sent) {
          setLoadingFunction(false);
          setErrorFunction(error);
          dispatch(logout());
          return Promise.reject(error);
        }
        setLoadingFunction(false);
        setErrorFunction(error);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return { axios, loading, error };
};

export default useAxiosPrivate;
