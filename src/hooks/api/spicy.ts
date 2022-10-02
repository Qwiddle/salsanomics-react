import { ISpicyPool, ISpicyToken } from '../../const/ecosystem';

const SPICY_API = 'https://spicyb.sdaotools.xyz/api/rest';

const calculateDayAgg = () => {
  const aggStart = new Date();
  aggStart.setDate(aggStart.getDate() - 7);
  return Math.floor(aggStart.getTime() / 1000);
};

export const fetchTokenPrice = async (contract: string, agg = calculateDayAgg()) => {
  const req = `${SPICY_API}/TokenList?_ilike=${contract}:0&day_agg_start=${agg}`;
  const res = await fetch(req);

  if (res.ok) {
    const json = await res.json();
    const { tokens } = json;

    const price = tokens[0].derivedxtz;

    return price;
  }

  throw new Error(`Failed to fetch price for ${contract}`);
};

export const fetchSpicyTokens = async (agg = calculateDayAgg()): Promise<ISpicyToken[]> => {
  const req = `${SPICY_API}/TokenList?day_agg_start=${agg}`;
  const res = await fetch(req);

  if (res.ok) {
    const json = await res.json();
    const { tokens } = json;

    const spicyTokens = tokens.map((token: any) => ({
      symbol: token.symbol,
      derivedXtz: token.derivedxtz,
      tag: token.tag,
      decimals: token.decimals,
    }));

    // eslint-disable-next-line no-console
    console.log('SpicySwap tokens:', spicyTokens);

    return spicyTokens;
  }

  throw new Error('Failed to fetch SpicySwap tokens');
};

export const fetchSpicyPools = async (): Promise<ISpicyPool[]> => {
  const res = await fetch(`${SPICY_API}/PoolListAll/`);

  if (res.ok) {
    const json = await res.json();
    const pools = json.pair_info;

    const spicyPools = pools.map((pool: any) => ({
      contract: pool.contract,
      reserve: pool.reservextz,
      token0: pool.token0,
      token1: pool.token1,
    }));

    // eslint-disable-next-line no-console
    console.log('SpicySwap pools:', spicyPools);

    return spicyPools;
  }

  throw new Error('Failed to fetch SpicySwap pools');
};
