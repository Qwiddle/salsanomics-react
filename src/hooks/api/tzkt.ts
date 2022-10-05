const TZKT_API = `https://api.tzkt.io/v1`;

export const getEventBuyIns = async () => {
  const res = await fetch(
    `${TZKT_API}/accounts/KT1DdxRFoVEjE2FtsuEL1p2iippu6xCw8XhS/operations?entrypoint=buyIn&limit=300`
  );
  const json = await res.json();

  return json;
};

export const getEventDetails = async () => {
  const res = await fetch(`${TZKT_API}/contracts/KT1DdxRFoVEjE2FtsuEL1p2iippu6xCw8XhS/storage/history`);
  const json = await res.json();

  const buyIns = await getEventBuyIns();

  const events = json
    .filter((e: any) => {
      if (e.operation.parameter) {
        const entryPoint = e.operation.parameter.entrypoint;
        return entryPoint === 'startContest';
      }

      return false;
    })
    .map((e: any) => {
      const now = buyIns.filter((b: any) => {
        const oTimestamp = new Date(b.timestamp);

        if (oTimestamp > new Date(e.timestamp) && oTimestamp < new Date(e.value.ending)) {
          return true;
        }

        return false;
      });

      return {
        participants: now.length,
        start: new Date(e.timestamp),
        end: new Date(e.value.ending),
        buyIn: Number(e.value.buy_in) / 10 ** 6,
        buyFee: Number(e.value.buy_in_fee),
      };
    });

  return events;
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

export const fetchTwo = async () => {
  return fetch('google.com');
};
