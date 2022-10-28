import { useEffect, useState } from 'react';
import {
  mapAccounts,
  matchFarms,
  getMatterBalances,
  getMatterConfigs,
  getMatterFarms,
  getAccountsInternal,
} from './api/matter';
import { fetchSpicyPools, fetchSpicyTokens } from './api/spicy';

const useMatter = () => {
  const [accounts, setAccounts] = useState<Map<string, any>>();

  const fetchAll = async () => {
    const [
      mAccounts,
      mFarms,
      mConfigs,
      mTokens,
      mPools,
      mBalances
    ] = await Promise.all([
      getAccountsInternal(),
      getMatterFarms(),
      getMatterConfigs(),
      fetchSpicyTokens(),
      fetchSpicyPools(),
      getMatterBalances(),
    ])

    const matchedFarms = matchFarms(mPools, mTokens, mFarms, mConfigs, mBalances);
    const matchedAccounts = mapAccounts(mAccounts, matchedFarms);

    setAccounts(matchedAccounts);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return {
    accounts,
  };
};

export default useMatter;
