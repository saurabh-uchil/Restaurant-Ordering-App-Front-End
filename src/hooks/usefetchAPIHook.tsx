import { useState } from "react";

const useFetchAPIHook = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [data, setData] = useState([]);

  return {isLoading, hasError, data, setIsLoading, setError, setData};
}

export default useFetchAPIHook
