import { isObject } from "formik";
import { useState } from "react";

export default api = (apiFun) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataIdList, setDataIdlist] = useState([]);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFun(...args);
    console.log(response);
    setLoading(false);

    setError(response.error);
    setData(response);

    return response;
  };

  return {
    data,
    setData,
    dataIdList,
    setDataIdlist,
    error,
    loading,
    setLoading,
    request,
  };
};
