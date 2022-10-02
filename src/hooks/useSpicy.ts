import { useEffect, useState } from 'react';
import { ISpicyMetric, ISpicyPool, ISpicyToken } from '../const/ecosystem';
import { fetchSpicyPools, fetchSpicyTokens, fetchDailyMetrics } from './api/spicy';

const useSpicy = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [tokens, setTokens] = useState<ISpicyToken[]>();
  const [pools, setPools] = useState<ISpicyPool[]>();
  const [metrics, setMetrics] = useState<ISpicyMetric[]>();

  const fetchSpicy = async () => {
    const sTokens = await fetchSpicyTokens();
    const sPools = await fetchSpicyPools();
    const sMetrics = await fetchDailyMetrics();

    setTokens(sTokens);
    setPools(sPools);
    setMetrics(sMetrics);
    setLoading(false);
  };

  useEffect(() => {
    fetchSpicy();
  }, []);

  return {
    loading,
    tokens,
    pools,
    metrics,
  };
};

export default useSpicy;
