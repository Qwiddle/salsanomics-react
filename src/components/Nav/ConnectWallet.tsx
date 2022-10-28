import { useCallback, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiChevronsDown } from 'react-icons/fi';
import { useConnect, useAccountPkh, useTezos } from '../../dapp/dapp';
import { CardButton } from '../Card';
import { NETWORK } from '../../const/default';

const WalletButton = styled(CardButton)`
  appearance: none;
  line-height: 20px;
  margin-left: auto;
  color: black;
  align-items: center;
  display: flex;
  gap: 5px;
  @media screen and (max-width: 700px) {
    margin-right: auto;
    order: 3;
  }
`;

const truncate = (fullStr: string, strLen: number) => {
  if (fullStr.length <= strLen) return fullStr;

  const separator = '...';

  const sepLen = separator.length;
  const charsToShow = strLen - sepLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return fullStr.substring(0, frontChars) + separator + fullStr.substring(fullStr.length - backChars);
};

export default function ConnectWallet(props: { children: string }): JSX.Element {
  const connect = useConnect();
  const accountPkh = useAccountPkh();
  const tezos = useTezos();

  const [balance, setBalance] = useState<Number>();

  const loadBalance = useCallback(async () => {
    if (tezos) {
      const tezosOk = tezos as any;
      const bal = await tezosOk.tz.getBalance(accountPkh);
      setBalance(tezosOk.format('mutez', 'tz', bal).toString());
    }
  }, [tezos, accountPkh, setBalance]);

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  const getAccountPkh = useMemo(() => {
    if (!accountPkh) return undefined;

    const accPkh = accountPkh as string;

    return accPkh;
  }, [accountPkh]); // updates when the connected account changes

  const { children } = props;

  const handleConnect = useCallback(async () => {
    try {
      await connect(NETWORK, { forcePermission: true });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }, [connect]);

  return balance ? (
    <WalletButton onClick={handleConnect}>
      <>
        {truncate(getAccountPkh as string, 13)} {balance}
        <FiChevronsDown style={{ color: 'red' }} />
      </>
    </WalletButton>
  ) : (
    <WalletButton onClick={handleConnect}>{children}</WalletButton>
  );
}
