import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import TokenCopy from '../../components/TokenCopy';
import P from '../../components/P';
import { Card, CardBody, CardBox, CardButton, CardHeader, CardHeaderText } from '../../components/Card';
import { IActiveProject, IProjectMetric, TezosToken } from '../../const/ecosystem';
import useSpicy from '../../hooks/useSpicy';
import Header from '../../components/Header';
import useTzkt from '../../hooks/useTzkt';

export interface IAnalyticsProps {
  ecosystem: IActiveProject[];
  setEcosystem: (arg0: IActiveProject[]) => void;
}

const PageWrapper = styled.section`
  padding: 1em;
  height: 100%;
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
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`;

export default function Analytics(props: IAnalyticsProps): JSX.Element {
  const firstRender = useRef(true);
  const { ecosystem, setEcosystem } = props;
  const { loaded } = useSpicy();
  const { burns, buyIns, events } = useTzkt();

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (loaded && burns && buyIns && events) {
      console.log(buyIns, events);
      const spicy: IActiveProject[] = ecosystem.map((p) => {
        const spi: TezosToken = {
          contract: 'KT1CS2xKGHNPTauSh5Re4qE3N9PCfG5u4dPx',
          tag: 0,
        };

        const metric: IProjectMetric = {
          id: 0,
          tvl: buyIns.length,
          token: spi,
          tokenSupply: 0,
          tokenBurn: burns,
          eventStart: events[0].start.toString(),
          eventEnd: events[0].end.toString(),
        };

        const project: IActiveProject = {
          ...p,
          metrics: metric,
        };

        return project;
      });

      setEcosystem(spicy);
    } else {
      throw new Error("Can't retrieve metrics");
    }
  }, [loaded]);

  return (
    <PageWrapper>
      <PageHeader>🔥 Salsa Burn Chart</PageHeader>
      <Cards>
        {ecosystem.map((proj) => (
          <Card>
            <CardHeader>
              <CardHeaderText>Standard Contest</CardHeaderText>
              <P>
                {proj.metrics
                  ? `${
                      new Date(proj.metrics.eventStart).toLocaleDateString('en-en', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) || 0
                    }`
                  : `loading...`}
              </P>
              <P>{`->`}</P>
              <P>
                {proj.metrics
                  ? new Date(proj.metrics.eventEnd).toLocaleDateString('en-en', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }) || 0
                  : `loading...`}
              </P>
            </CardHeader>
            <CardBody>
              <CardBox>
                <P>Total Burn (ytd)</P>
                <TokenCopy amount={proj.metrics?.tokenBurn} ticker={proj.ticker} />
              </CardBox>
              <CardBox>
                <P>Total Pot (active)</P>
                <P>{proj.metrics ? `${proj.metrics.tvl || 0} + 100 ꜩ` : `loading...`}</P>
              </CardBox>
            </CardBody>
            <CardButton>View</CardButton>
          </Card>
        ))}
      </Cards>
    </PageWrapper>
  );
}
