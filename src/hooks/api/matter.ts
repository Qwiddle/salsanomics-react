import { getSupply, getTokenName, TZKT_API } from './tzkt';
import { MTTR } from '../../const/ecosystem';

const mapFarms = async (farm: any) => {
  return {
    symbol: await getTokenName(farm.key.fa2_address),
    key: farm.key,
    value: farm.value,
    supply: await getSupply(farm.key.fa2_address, farm.key.token_id),
  };
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
