import { ICasinoEvent, CasinoEvent } from '../../const/ecosystem';

const TZKT_API = `https://api.tzkt.io/v1`;

const casinoContracts = ['KT1Q3Z9VwmSG6wFNLebD9yRm7PENXHJxHn3n', 'KT1DdxRFoVEjE2FtsuEL1p2iippu6xCw8XhS'];
const casinoMappings: Map<string, CasinoEvent> = new Map([
  ['KT1DdxRFoVEjE2FtsuEL1p2iippu6xCw8XhS', 'standard'],
  ['KT1Q3Z9VwmSG6wFNLebD9yRm7PENXHJxHn3n', 'high'],
]);

// todo: create type for event buy in
export const getEventBuyIns = async (contract: string): Promise<any> => {
  const res = await fetch(`${TZKT_API}/accounts/${contract}/operations?entrypoint=buyIn&limit=300`);
  const json = await res.json();
  return json;
};

export const getEventDetails = async (): Promise<ICasinoEvent[]> => {
  const casinoEvents = await Promise.all<any>(
    casinoContracts.map(async (contract) => {
      const buyIns = await getEventBuyIns(contract);

      const res = await fetch(`${TZKT_API}/contracts/${contract}/storage/history`);
      const json = await res.json();

      return json
        .filter((f: any) => {
          if (f.operation.parameter) {
            const entryPoint = f.operation.parameter.entrypoint;
            return entryPoint === 'startContest';
          }

          return false;
        })
        .map((e: any) => {
          const now = buyIns.filter((b: any) => {
            const oTimestamp = new Date(b.timestamp);
            return oTimestamp > new Date(e.timestamp) && oTimestamp < new Date(e.value.ending);
          });

          const buyIn = Number(e.value.buy_in) / 10 ** 6;
          const participants = now.length;
          const pot = buyIn * participants;
          const type = casinoMappings.get(contract);

          return {
            participants,
            pot,
            buyIn,
            type,
            buyFee: Number(e.value.buy_in_fee),
            start: new Date(e.timestamp),
            end: new Date(e.value.ending),
          };
        });
    })
  );

  return casinoEvents.flat();
};

export const fetchBurns = async (): Promise<number> => {
  const req = `${TZKT_API}/tokens/balances?account=KT1CZMurPAjSfZqcn6LBUNUhG4byE6AJgDT6&token.contract=KT19ovJhcsUn4YU8Q5L3BGovKSixfbWcecEA`;
  const res = await fetch(req);

  if (res.ok) {
    const json = await res.json();

    const burnAmount = json[0].balance;
    return burnAmount;
  }

  throw new Error(`Failed to fetch daily metrics.`);
};
