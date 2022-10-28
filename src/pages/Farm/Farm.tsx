import { useMemo } from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardHeaderText, CardBody, CardBox, CardButton } from '../../components/Card';
import TokenCopy from '../../components/TokenCopy';
import P from '../../components/Typography/P';
import { useAccountPkh } from '../../dapp/dapp';
import useMatter from '../../hooks/useMatter';

const PageWrapper = styled.section`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export default function Farm(): JSX.Element {
  const { accounts } = useMatter();
  const accountPkh = useAccountPkh();

  const getAccountPkh = useMemo(() => {
    if (!accountPkh) return undefined;

    const accPkh = accountPkh as string;

    return accPkh;
  }, [accountPkh]);

  const findUser = () => {
    if (accounts && getAccountPkh) return accounts.get(getAccountPkh).farms;

    return false;
  };

  const activeUser = Object.values(findUser());

  console.log(activeUser);

  return activeUser ? (
    <PageWrapper>
      {activeUser.map((proj: any) => (
        <Card key={proj.contract}>
          <CardHeader>
            <CardHeaderText>{proj.symbol}</CardHeaderText>
          </CardHeader>
          <CardBody>
            <CardBox>
              <P>Staked Value</P>
              <TokenCopy amount={proj.value} ticker="ꜩ" />
            </CardBox>
            <CardBox>
              <P>Total Rewards</P>
              <P>{Number(proj.reward)} ꜩ</P>
            </CardBox>
          </CardBody>
          <CardButton>Claim</CardButton>
        </Card>
      ))}
    </PageWrapper>
  ) : (
    <p>&nbsp;</p>
  );
}
