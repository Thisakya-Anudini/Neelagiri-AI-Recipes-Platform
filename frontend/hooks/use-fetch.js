import { useState } from "react";
import { toast } from "sonner";
//custom hook to handle fetch requests with loading and error states  
const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
//async function to handle fetch requests
  const fn = async (...args) => {
    setLoading(true);
    setError(null);
//try catch block to handle errors and set data
    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
