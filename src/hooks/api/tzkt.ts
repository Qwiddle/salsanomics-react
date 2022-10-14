import { ICasinoEvent, CasinoEvent, SDAO, BURNER } from '../../const/ecosystem';

const TZKT_API = `https://api.tzkt.io/v1`;

type EventBuyIn = {
  timestamp: Date;
  amount: number;
  sender: string;
};

type EventOperation = {
  start: Date;
  end: Date;
  contract: string;
  buyIn: number;
  buyFee: number;
};

const transformEvents = (
  events: EventOperation[],
  buyIns: EventBuyIn[],
  casinoMappings: Map<string, CasinoEvent>
): ICasinoEvent[] => {
  return events.map((event) => {
    const { contract, buyIn, buyFee } = event;

    const filterActive = (b: EventBuyIn) => {
      return new Date(b.timestamp) > event.start && new Date(b.timestamp) < event.end;
    };

    const active: any = buyIns.filter(filterActive);

    const participants = active.length;
    const pot = buyIn * participants;
    const burn = buyFee * participants;

    const type = casinoMappings.get(contract);

    return {
      ...event,
      participants,
      pot,
      type,
      burn,
      buyIns: active,
    };
  });
};

const getEventBuyIns = async (contract: string): Promise<EventBuyIn> => {
  const req = `${TZKT_API}/accounts/${contract}/operations?entrypoint=buyIn&limit=300`;
  const res = await fetch(req);

  if (!res.ok) throw new Error(`Failed to fetch Event BuyIns, ${res.status}`);

  const json = await res.json();

  return json.map((buyIn: any) => {
    const timestamp = new Date(buyIn.timestamp);
    const sender = buyIn.sender.address;
    const amount = buyIn.amount / 10 ** 6;

    return {
      timestamp,
      sender,
      amount,
    };
  });
};

const getEventsByContract = async (contract: string): Promise<EventOperation> => {
  const req = `${TZKT_API}/contracts/${contract}/storage/history`;
  const res = await fetch(req);

  if (!res.ok) throw new Error(`Failed to fetch casino events, ${res.status}`);

  const json = await res.json();

  const filterEvent = (event: any) => {
    if (event.operation.parameter) {
      const entryPoint = event.operation.parameter.entrypoint;
      return entryPoint === 'startContest';
    }

    return false;
  };

  const transformEvent = (event: any) => {
    const buyFee = Number(event.value.buy_in_fee);
    const buyIn = Number(event.value.buy_in) / 10 ** 6;

    return {
      buyIn,
      contract,
      buyFee,
      start: new Date(event.timestamp),
      end: new Date(event.value.ending),
    };
  };

  return json.filter(filterEvent).map(transformEvent);
};

const getEventDetails = async (contracts: Array<string>): Promise<any> => {
  const casino = await Promise.all<any>(
    contracts.map(async (contract: string) => {
      const buyIns = await getEventBuyIns(contract);
      const events = await getEventsByContract(contract);

      return {
        buyIns,
        events,
      };
    })
  );

  return casino;
};

export const getBurns = async (): Promise<number> => {
  const req = `${TZKT_API}/tokens/balances?account=${BURNER}&token.contract=${SDAO}`;
  const res = await fetch(req);

  if (!res.ok) throw new Error(`Failed to fetch daily metrics.`);

  const json = await res.json();
  const burnAmount = json[0].balance;

  return burnAmount;
};

export const tzktCasino = async (casinoMap: Map<string, CasinoEvent>): Promise<ICasinoEvent[]> => {
  const eventDetails = await getEventDetails(Array.from(casinoMap.keys()));

  const casino = eventDetails
    .map((e: any) => {
      return transformEvents(e.events, e.buyIns, casinoMap);
    })
    .flat();

  return casino;
};
