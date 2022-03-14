import axios, { AxiosResponse, Method } from "axios";
import React, { useEffect, useState } from "react";

export function projectApi<T>(
  method: Method,
  path: string,
  callback: (data: T) => void,
  data = {}
): void {
  const baseUrl = "http://localhost:3001";
  axios({
    url: baseUrl + path,
    method: method,
    data,
  }).then((response: AxiosResponse<T>) => {
    callback(response.data);
  });
}

export function useProjectApi<T>(
  path: string
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [apiResponse, setApiResponse] = useState<T>();
  useEffect(() => {
    projectApi<T>("GET", path, setApiResponse);
  }, [path]);

  return [apiResponse, setApiResponse];
}
