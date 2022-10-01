import styled from 'styled-components';
import TokenCopy from '../../components/TokenCopy';
import P from '../../components/P';
import {
  Card,
  CardBody,
  CardBox,
  CardHeader,
  CardHeaderText,
} from '../../components/Card';
import { ReactComponent as SalsaToken } from './assets/spicyswap_logo.svg';

const PageWrapper = styled.section`
  padding: 1em;
  background: papayawhip;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

export default function Analytics(): JSX.Element {
  return (
    <PageWrapper>
      <Card>
        <CardHeader>
          <CardHeaderText>SpicySwap 🌶️</CardHeaderText>
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
      </Card>
    </PageWrapper>
  );
}
