import styled from 'styled-components';
import TokenCopy from '../../components/TokenCopy';
import P from '../../components/P';
import { Card, CardBody, CardBox, CardButton, CardHeader, CardHeaderText } from '../../components/Card';
import Header from '../../components/Header';
import useTzkt from '../../hooks/useTzkt';

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

export default function Analytics(): JSX.Element {
  const { events } = useTzkt();

  return (
    <PageWrapper>
      <PageHeader>🔥 Salsa Burn Chart</PageHeader>
      <Cards>
        {events
          ? events.map((proj) => (
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
                    {new Date(proj.end).toLocaleDateString('en-en', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }) || 0}
                  </P>
                </CardHeader>
                <CardBody>
                  <CardBox>
                    <P>Total Burn (ytd)</P>
                    <TokenCopy amount={proj.buyIn} ticker="SDAO" />
                    <P>Total Participants</P>
                    {proj.participants}
                  </CardBox>
                  <CardBox>
                    <P>Total Pot (active)</P>
                    <P>{proj.pot} ꜩ</P>
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
