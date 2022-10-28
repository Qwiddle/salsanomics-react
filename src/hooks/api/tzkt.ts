import { ICasinoEvent, CasinoEvent, SDAO, BURNER } from '../../const/ecosystem';
import { opBlacklist } from '../../const/default';
import fetchival from 'fetchival'

export const TZKT_API = `https://api.tzkt.io/v1`;

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

const filterEvent = (event: any) => {
  if (event.operation.parameter) {
    const entryPoint = event.operation.parameter.entrypoint;
    const { hash } = event.operation;

    return entryPoint === 'startContest' && !opBlacklist.some((h) => h === hash);
  }

  return false;
};

const transformEvent = ({
  contract,
  event
}: { contract: string, event: any }) => {
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

// undifferentiated (heavy) lifting

const createTzktAPI = ({ baseApiUrl }) => {
  const fetch = fetchival(baseApiUrl)

  const getEventBuyIns = async (contract: string): Promise<EventBuyIn> => {
    const history = await fetch(`accounts/${contract}/operations?entrypoint=buyIn&limit=300`)
    return history.map((buyIn: any) => {
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
    const events = await fetch(`contracts/${contract}/storage/history`)
    return events.filter(filterEvent).map(transformEvent);
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

  const getTokenName = async (contract: string) => {
    const { alias } = await fetch(`contracts/${contract}`)
    return alias
  };

  const getSupply = async (contract: string, id: string) => {
    const req = `${TZKT_API}/tokens/?contract=${contract}${id ? `&tokenId=${id}` : ``}`;
    const res = await fetch(req);

    if (!res.ok) throw new Error(`Failed to fetch token supply.`);

    const json = await res.json();
    const supply = Number(json[0].totalSupply);

    return supply;
  };

  const getBurns = async (): Promise<number> => {
    const req = `${TZKT_API}/tokens/balances?account=${BURNER}&token.contract=${SDAO}`;
    const res = await fetch(req);

    if (!res.ok) throw new Error(`Failed to fetch daily metrics.`);

    const json = await res.json();
    const burnAmount = json[0].balance;

    return burnAmount;
  };

  const tzktCasino = async (casinoMap: Map<string, CasinoEvent>): Promise<ICasinoEvent[]> => {
    const eventDetails = await getEventDetails(Array.from(casinoMap.keys()));

    const casino = eventDetails
      .map((e: any) => {
        return transformEvents(e.events, e.buyIns, casinoMap);
      })
      .flat();

    return casino;
  };

  return {
    getTokenName,
    getSupply,
    getBurns,
    tzktCasino,
  }
}

export default createTzktAPI
