import { useEffect, useState } from 'react';
import { ICasinoEvent } from '../const/ecosystem';
import { getBurns, getEventDetails } from './api/tzkt';

const useTzkt = () => {
  const [burnsLoaded, setLoaded] = useState<Boolean>(false);
  const [burns, setBurns] = useState<number>();
  const [events, setEvents] = useState<ICasinoEvent[]>([]);

  const fetchTzkt = async () => {
    const tBurns = await getBurns();
    const tEvents = await getEventDetails();

    setLoaded(true);
    setBurns(tBurns);
    setEvents(tEvents);
  };

  useEffect(() => {
    fetchTzkt();
  }, []);

  return {
    burnsLoaded,
    burns,
    events,
  };
};

export default useTzkt;
