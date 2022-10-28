import { TZKT_API } from './tzkt';
import { MTTR } from '../../const/ecosystem';

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
