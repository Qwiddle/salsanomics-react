import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import TokenCopy from '../../components/TokenCopy';
import P from '../../components/P';
import { Card, CardBody, CardBox, CardButton, CardHeader, CardHeaderText } from '../../components/Card';
import { ICasinoEvent } from '../../const/ecosystem';
import Header from '../../components/Header';
import useTzkt from '../../hooks/useTzkt';

export interface IAnalyticsProps {
  ecosystem: ICasinoEvent[];
  setEcosystem: (arg0: ICasinoEvent[]) => void;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ecosystem, setEcosystem } = props;
  const { burns, buyIns, events } = useTzkt();
  const [cEvents, setEvents] = useState<ICasinoEvent[]>();

  useEffect(() => {
    if (firstRender.current) {
      setEvents(ecosystem);
      firstRender.current = false;
      return;
    }

    if (burns && buyIns && events) {
      const casinoEvents: ICasinoEvent[] = events.map((e) => {
        const event: ICasinoEvent = {
          type: e.buyIn <= 5 ? 'standard' : 'high',
          ...e,
        };

        return event;
      });

      setEvents(casinoEvents);

      console.log(ecosystem);
    } else {
      throw new Error("Can't retrieve metrics");
    }
  }, [ecosystem, burns, buyIns, events]);

  return (
    <PageWrapper>
      <PageHeader>🔥 Salsa Burn Chart</PageHeader>
      <Cards>
        {cEvents
          ? cEvents.map((proj) => (
              <Card>
                <CardHeader>
                  <CardHeaderText>{proj.type} Contest</CardHeaderText>
                  <P>
                    {`${
                      proj.start.toLocaleDateString('en-en', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) || 0
                    }`}
                  </P>
                  <P>{`->`}</P>
                  <P>
                    {proj.start
                      ? new Date(proj.end).toLocaleDateString('en-en', {
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
                    <TokenCopy amount={proj.buyIn} ticker="SDAO" />
                  </CardBox>
                  <CardBox>
                    <P>Total Pot (active)</P>
                    <P>{proj.participants ? `${proj.participants || 0} ꜩ` : `loading...`}</P>
                  </CardBox>
                </CardBody>
                <CardButton>View</CardButton>
              </Card>
            ))
          : ''}
      </Cards>
    </PageWrapper>
  );
}
