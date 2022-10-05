import { useEffect, useState } from 'react';
import { ICasinoEvent } from '../const/ecosystem';
import { fetchBurns, getEventBuyIns, getEventDetails } from './api/tzkt';

const useTzkt = () => {
  const [burnsLoaded, setLoaded] = useState<Boolean>(false);
  const [burns, setBurns] = useState<number>();
  const [buyIns, setBuyIns] = useState([]);
  const [events, setEvents] = useState<ICasinoEvent[]>([]);

  const fetchTzkt = async () => {
    const tBurns = await fetchBurns();
    const tBuyIns = await getEventBuyIns();
    const tEvents = await getEventDetails();

    setLoaded(true);
    setBurns(tBurns);
    setBuyIns(tBuyIns);
    setEvents(tEvents);
  };

  useEffect(() => {
    fetchTzkt();
  }, []);

  return {
    burnsLoaded,
    burns,
    buyIns,
    events,
  };
};

export default useTzkt;
