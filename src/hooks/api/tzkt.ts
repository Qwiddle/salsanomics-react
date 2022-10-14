import { ICasinoEvent, CasinoEvent, SDAO, BURNER } from '../../const/ecosystem';

const TZKT_API = `https://api.tzkt.io/v1`;

const casinoContracts = ['KT1Q3Z9VwmSG6wFNLebD9yRm7PENXHJxHn3n', 'KT1DdxRFoVEjE2FtsuEL1p2iippu6xCw8XhS'];

const casinoMappings: Map<string, CasinoEvent> = new Map([
  ['KT1DdxRFoVEjE2FtsuEL1p2iippu6xCw8XhS', 'standard'],
  ['KT1Q3Z9VwmSG6wFNLebD9yRm7PENXHJxHn3n', 'high'],
]);

type EventBuyIn = {
  contract: string;
  timestamp: Date;
};

const transformEvents = (events: any, buyIns: []): any => {
  const filterEvent = (event: any) => {
    if (event.operation.parameter) {
      const entryPoint = event.operation.parameter.entrypoint;
      return entryPoint === 'startContest';
    }

    return false;
  };

  const populateEvent = (event: any) => {
    const active: any = buyIns.filter((b: any) => {
      const oTimestamp = new Date(b.timestamp);
      return oTimestamp > new Date(event.timestamp) && oTimestamp < new Date(event.value.ending);
    });

    const { contract } = active[0];
    const type = casinoMappings.get(contract);

    const buyIn = Number(event.value.buy_in) / 10 ** 6;
    const buyFee = Number(event.value.buy_in_fee);

    const participants = active.length;
    const pot = buyIn * participants;
    const burn = buyFee * participants;

    return {
      participants,
      pot,
      buyIn,
      type,
      buyFee,
      burn,
      buyIns: active,
      start: new Date(event.timestamp),
      end: new Date(event.value.ending),
    };
  };

  return events.filter(filterEvent).map(populateEvent);
};

const getEventBuyIns = async (contract: string): Promise<EventBuyIn> => {
  const req = `${TZKT_API}/accounts/${contract}/operations?entrypoint=buyIn&limit=300`;
  const res = await fetch(req);

  if (!res.ok) throw new Error(`Failed to fetch Event BuyIns, ${res.status}`);

  const json = await res.json();

  const transformBuyIn = (buyIn: any): EventBuyIn => {
    const contract = buyIn.target.address;
    const timestamp = new Date(buyIn.timestamp);

    return {
      contract,
      timestamp,
    };
  };

  return json.map(transformBuyIn);
};

const getEventsByContract = async (contract: string): Promise<any> => {
  const req = `${TZKT_API}/contracts/${contract}/storage/history`;
  const res = await fetch(req);

  if (!res.ok) throw new Error(`Failed to fetch casino events, ${res.status}`);

  const json = await res.json();
  return json;
};

export const getEventDetails = async (): Promise<ICasinoEvent[]> => {
  const casino = await Promise.all<any>(
    casinoContracts.map(async (contract: string) => {
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
