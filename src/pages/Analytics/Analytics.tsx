import styled from 'styled-components';
import { useEffect } from 'react';
import TokenCopy from '../../components/TokenCopy';
import P from '../../components/P';
import { Card, CardBody, CardBox, CardButton, CardHeader, CardHeaderText } from '../../components/Card';
import { IActiveProject, IProjectMetric, TezosToken } from '../../const/ecosystem';
import chart from '../../assets/chart.png';
import useSpicy from '../../hooks/useSpicy';
import Header from '../../components/Header';

export interface IAnalyticsProps {
  ecosystem: IActiveProject[];
  setEcosystem: (arg0: IActiveProject[]) => void;
}

const PageWrapper = styled.section`
  padding: 1em;
  height: 100vh;
  background: #f0f0f0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.3fr 1.7fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'header header header'
    'cards cards cards'
    'cards cards cards';
`;

const PageHeader = styled(Header)`
  grid-area: header;
  text-align: center;
`;

const Cards = styled.section`
  grid-area: cards;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`;

export default function Analytics(props: IAnalyticsProps): JSX.Element {
  const { ecosystem, setEcosystem } = props;
  const { loading, metrics } = useSpicy();

  useEffect(() => {
    if (!loading && metrics) {
      const spicy: IActiveProject[] = ecosystem.map((p) => {
        const spi: TezosToken = {
          contract: 'KT1CS2xKGHNPTauSh5Re4qE3N9PCfG5u4dPx',
          tag: 0,
        };

        const metric: IProjectMetric = {
          id: 0,
          tvl: Number(metrics[0].tvlXtz.toFixed(2)),
          token: spi,
          tokenSupply: 0,
          tokenBurn: 0,
        };

        const project: IActiveProject = {
          ...p,
          metrics: metric,
        };

        return project;
      });

      setEcosystem(spicy);
    }
  }, [setEcosystem, loading, metrics]);

  return (
    <PageWrapper>
      <PageHeader>🔥 Salsa Burn Chart</PageHeader>
      <Cards>
        {ecosystem.map((proj) => (
          <Card>
            <CardHeader>
              <CardHeaderText>{proj.name}</CardHeaderText>
            </CardHeader>
            <CardBody>
              <CardBox>
                <P>Token Burns</P>
                <TokenCopy ticker={proj.ticker} Logo={proj.logo} />
              </CardBox>
              <CardBox>
                <P>TVL</P>
                <P>{!loading && proj.metrics ? `${proj.metrics.tvl || 0} ꜩ` : `loading...`}</P>
              </CardBox>
              <CardBox>
                <img src={chart} alt="chart" />
              </CardBox>
            </CardBody>
            <CardButton>View</CardButton>
          </Card>
        ))}
      </Cards>
    </PageWrapper>
  );
}
