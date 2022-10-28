import BigNumber from 'bignumber.js';
import { getSupply, getTokenName, TZKT_API } from './tzkt';
import { ISpicyPool, ISpicyToken, MTTR } from '../../const/ecosystem';
import { fetchTokenPrice } from './spicy';

const lpToTez = (staked: BigNumber, farm: any) => {
  if (!farm.single) {
    const { reserve, supply, decimals } = farm.pool;
    const tezPerLp = BigNumber(reserve).dividedBy(BigNumber(supply).shiftedBy(-decimals));
    const lpValue = tezPerLp.multipliedBy(BigNumber(staked).shiftedBy(-decimals));

    return lpValue.toFixed(2);
  }
  const { derivedXtz, decimals } = farm.token;
  const tokenValue = BigNumber(derivedXtz).multipliedBy(BigNumber(staked).shiftedBy(-decimals));

  return tokenValue.toFixed(2);
};

export const matchFarms = (
  spicyPools: ISpicyPool[],
  spicyTokens: ISpicyToken[],
  farms: any,
  configs: any,
  balances: any
) => {
  const today = new Date();
  const active = new Date(configs[0].active_time);

  const activeConfig = today.getTime() >= active.getTime() ? configs[0].farm_configs : configs[1].farm_configs;

  const mapped = farms.reduce((a: any, p: any) => {
    const findToken = spicyTokens.find((token) => token.tag === `${p.key.fa2_address}:${p.key.token_id}`);
    const findPool = spicyPools.find((pool) => pool.contract === p.key.fa2_address);
    const findConfig = activeConfig.find((config: any) => config.key.fa2_address === p.key.fa2_address);
    const findBalance = balances.find((balance: any) => balance.contract.address === p.key.fa2_address);

    if (findConfig) {
      a.push({
        key: p.key,
        value: p.value,
        ...(findPool && {
          pool: {
            supply: p.supply,
            ...findPool,
            decimals: 18,
            balance: findBalance.balance,
          },
          symbol: p.symbol,
        }),
        ...(findToken && {
          token: {
            supply: p.supply,
            ...findToken,
            balance: findBalance.balance,
          },
          symbol: p.symbol,
        }),
        single: !findPool,
        rps: Number(findConfig.value.reward_per_sec),
      });
    }

    return a;
  }, []);

  return mapped;
};

export const mapAccounts = (accounts: any, farms: any) => {
  const mapped = accounts.reduce((map: any, current: any) => {
    const address = current.key.user_address;
    const grouped = map.get(address);

    const farm = farms.find((f: any) => f.key.fa2_address === current.key.token.fa2_address);
    const farmValue = farm && current.value.staked !== 0 ? Number(lpToTez(BigNumber(current.value.staked), farm)) : 0;
    const farmReserve = farm && farm.pool ? farm.pool.reserve : 0;
    const symbol = farm ? farm.symbol : '';

    // eslint-disable-next-line no-param-reassign
    current.totalValue = Number(farmValue);

    if (farm && Number(farmValue) !== 0) {
      const farmBalance = farm.pool ? farm.pool.balance : farm.token.balance;

      if (!grouped) {
        map.set(address, {
          totalValue: current.totalValue,
          farms: {
            ...current.farms,
            ...(farmValue !== 0 && {
              [current.key.token.fa2_address]: {
                tokenId: current.key.token.token_id,
                reward: BigNumber(current.value.reward),
                staked: Number(current.value.staked),
                contract: current.key.token.fa2_address,
                totalPercent: '0',
                value: Number(farmValue),
                symbol,
                reserve: farmReserve,
                balance: Number(farmBalance),
              },
            }),
          },
        });
      } else {
        map.set(address, {
          ...grouped,
          totalValue: Number(grouped.totalValue) + Number(current.totalValue),
          farms: {
            ...grouped.farms,
            ...(farmValue !== 0 && {
              [current.key.token.fa2_address]: {
                tokenId: current.key.token.token_id,
                reward: BigNumber(current.value.reward),
                staked: Number(current.value.staked),
                contract: current.key.token.fa2_address,
                totalPercent: '0',
                value: Number(farmValue),
                symbol,
                reserve: farmReserve,
                balance: Number(farmBalance),
              },
            }),
          },
        });
      }
    }

    return map;
  }, new Map());

  return mapped;
};

const mapFarms = async (farm: any) => {
  return {
    symbol: await getTokenName(farm.key.fa2_address),
    key: farm.key,
    value: farm.value,
    supply: await getSupply(farm.key.fa2_address, farm.key.token_id),
  };
};

export const getMatterPrice = async () => {
  const price = await fetchTokenPrice(MTTR);
  return price;
};

export const getAccountsInternal = async () => {
  const req = `${TZKT_API}/contracts/${MTTR}/bigmaps/accounts_internal/keys?limit=1000`;
  const res = await fetch(req);

  if (!res.ok) throw new Error("Couldn't retrieve accounts_internal");

  const json = await res.json();

  return json;
};

export const getMatterConfigs = async () => {
  const req = `${TZKT_API}/contracts/${MTTR}/storage/`;
  const res = await fetch(req);

  if (!res.ok) throw new Error("Couldn't retrieve matter farm configurations.");

  const json = await res.json();
  const { configs } = json;

  return configs;
};

export const getMatterFarms = async () => {
  const req = `${TZKT_API}/contracts/${MTTR}/bigmaps/farms_internal/keys`;
  const res = await fetch(req);

  if (!res.ok) throw new Error("Couldn't retrieve active matter farms");

  const json = await res.json();
  const farms = await Promise.all(json.map(mapFarms));

  return farms;
};

export const getMatterBalances = async () => {
  const req = `&limit=100&select=balance,token.id%20as%20id,token.contract%20as%20contract,token.standard%20as%20standard,token.tokenId%20as%20token_id`;
  const res = await fetch(`${TZKT_API}/tokens/balances?account=${MTTR}${req}`);

  if (!res.ok) throw new Error("Couldn't retrieve accounts_internal");

  const json = await res.json();

  return json;
};
