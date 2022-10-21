import { useCallback } from 'react';
import styled from 'styled-components';
import { useConnect } from '../../dapp/dapp';
import { CardButton } from '../Card';
import { NETWORK } from '../../const/default';

const WalletButton = styled(CardButton)`
  appearance: none;
  line-height: 20px;
  margin-left: auto;
  color: black;
  @media screen and (max-width: 700px) {
    margin-right: auto;
    order: 3;
  }
`;

export default function ConnectWallet(props: { children: string }): JSX.Element {
  const connect = useConnect();
  const { children } = props;

  const handleConnect = useCallback(async () => {
    try {
      await connect(NETWORK, { forcePermission: true });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }, [connect]);

  return <WalletButton onClick={handleConnect}>{children}</WalletButton>;
}
