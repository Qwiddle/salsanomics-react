import { useEffect, useState } from 'react';
import { ISpicyPool, ISpicyToken } from '../const/ecosystem';
import { fetchSpicyPools, fetchSpicyTokens } from './api/spicy';

const useSpicy = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [tokens, setTokens] = useState<ISpicyToken[]>();
  const [pools, setPools] = useState<ISpicyPool[]>();

  setLoading(false);

  const fetchSpicy = async () => {
    const sTokens = await fetchSpicyTokens();
    const sPools = await fetchSpicyPools();

    setTokens(sTokens);
    setPools(sPools);
  };

  useEffect(() => {
    fetchSpicy();
  }, []);

  return {
    loading,
    tokens,
    pools,
  };
};

export default useSpicy;
