import { useEffect, useState } from 'react';
import { fetchBurns } from './api/tzkt';

const useTzkt = () => {
  const [burnsLoaded, setLoaded] = useState<Boolean>(false);
  const [burns, setBurns] = useState<number>();

  const fetchTzkt = async () => {
    const tBurns = await fetchBurns();

    setLoaded(true);
    setBurns(tBurns);
  };

  useEffect(() => {
    fetchTzkt();
  }, []);

  return {
    burnsLoaded,
    burns,
  };
};

export default useTzkt;
