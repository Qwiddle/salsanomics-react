import { useEffect, useState } from 'react';
import { ICasinoEvent, casinoMappings } from '../const/ecosystem';
import { getBurns, tzktCasino } from './api/tzkt';

const useTzkt = () => {
  const [burnsLoaded, setLoaded] = useState<Boolean>(false);
  const [burns, setBurns] = useState<number>();
  const [events, setEvents] = useState<ICasinoEvent[]>([]);

  const fetchTzkt = async () => {
    const tBurns = await getBurns();
    const tEvents = await tzktCasino(casinoMappings);

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
