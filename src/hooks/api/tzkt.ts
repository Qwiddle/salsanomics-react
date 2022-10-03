const TZKT_API = `https://api.tzkt.io/v1`;

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
