import { ICasinoEvent, CasinoEvent, SDAO, BURNER } from '../../const/ecosystem';

const TZKT_API = `https://api.tzkt.io/v1`;

const casinoMappings: Map<string, CasinoEvent> = new Map([
  ['KT1DdxRFoVEjE2FtsuEL1p2iippu6xCw8XhS', 'standard'],
  ['KT1Q3Z9VwmSG6wFNLebD9yRm7PENXHJxHn3n', 'high'],
]);

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

const transformEvents = (events: EventOperation[], buyIns: EventBuyIn[]): ICasinoEvent[] => {
  return events.map((event) => {
    const active: any = buyIns.filter((b: any) => {
      const { start, end } = event;

      const oTimestamp = new Date(b.timestamp);
      return oTimestamp > start && oTimestamp < end;
    });

    const { contract, buyIn, buyFee } = event;

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

export const getEventDetails = async (): Promise<ICasinoEvent[]> => {
  const casino = await Promise.all<any>(
    Array.from(casinoMappings.keys()).map(async (contract: string) => {
      const buyIns = await getEventBuyIns(contract);
      const events = await getEventsByContract(contract);

      return {
        buyIns,
        events,
      };
    })
  );

  const eventDetails = casino
    .map((e) => {
      return transformEvents(e.events, e.buyIns);
    })
    .flat();

  return eventDetails;
};

export const getBurns = async (): Promise<number> => {
  const req = `${TZKT_API}/tokens/balances?account=${BURNER}&token.contract=${SDAO}`;
  const res = await fetch(req);

  if (!res.ok) throw new Error(`Failed to fetch daily metrics.`);

  const json = await res.json();
  const burnAmount = json[0].balance;

  return burnAmount;
};
