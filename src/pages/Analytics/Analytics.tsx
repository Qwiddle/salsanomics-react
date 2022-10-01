/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactComponent as SalsaToken } from './assets/spicyswap_logo.svg';
import TokenCopy from '../../components/TokenCopy/TokenCopy';
import P from '../../components/P';

const PageWrapper = styled.section`
  padding: 1em;
  background: papayawhip;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const FarmCard = styled.div`
  min-width: 340px;
  min-height: 400px;
  display: flex;
  padding: 10px;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #fcfcfc;
  box-shadow: 0px 80px 105px rgba(0, 0, 0, 0.07),
    0px 10px 13px rgba(0, 0, 0, 0.03);
  border-radius: 24px 24px 24px 24px;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 250px;
  min-height: 40px;
  background: #f0f0f0;
  border-radius: 8px;
`;

const HeaderText = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
`;

const CardBox = styled.div`
  min-width: 80px;
  border-radius: 8px;
  background: #f0f0f0;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardBody = styled.div`
  flex: 1;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function Analytics(): JSX.Element {
  return (
    <PageWrapper>
      <FarmCard>
        <CardHeader>
          <HeaderText>SpicySwap 🌶️</HeaderText>
        </CardHeader>
        <CardBody>
          <CardBox>
            <P>Token</P>
            <TokenCopy ticker="SPI" Logo={SalsaToken} />
          </CardBox>
          <CardBox>
            <P>TVL</P>
            <P>150,123 ꜩ</P>
          </CardBox>
          <CardBox>
            <P>Volume (24h)</P>
            <P>712 ꜩ</P>
          </CardBox>
        </CardBody>
      </FarmCard>
    </PageWrapper>
  );
}
