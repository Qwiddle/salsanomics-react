import { useEffect, useState } from 'react';
import { ISpicyMetric, ISpicyPool, ISpicyToken } from '../const/ecosystem';
import { fetchSpicyPools, fetchSpicyTokens, fetchDailyMetrics } from './api/spicy';

const useSpicy = () => {
  const [loaded, setLoaded] = useState<Boolean>(false);
  const [tokens, setTokens] = useState<ISpicyToken[]>();
  const [pools, setPools] = useState<ISpicyPool[]>();
  const [metrics, setMetrics] = useState<ISpicyMetric[]>();

  const fetchSpicy = async () => {
    const sTokens = await fetchSpicyTokens();
    const sPools = await fetchSpicyPools();
    const sMetrics = await fetchDailyMetrics();

    setLoaded(true);
    setTokens(sTokens);
    setPools(sPools);
    setMetrics(sMetrics);
  };

  useEffect(() => {
    fetchSpicy();
  }, []);

  return {
    loaded,
    tokens,
    pools,
    metrics,
  };
};

export default useSpicy;
