import styled from 'styled-components';
import { useState } from 'react';
import TokenCopy from '../../components/TokenCopy';
import P from '../../components/P';
import { Card, CardBody, CardBox, CardButton, CardHeader, CardHeaderText } from '../../components/Card';
import Header from '../../components/Header';
import TableModal from './components/TableModal';
import useTzkt from '../../hooks/useTzkt';

const PageWrapper = styled.section`
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.3fr 1.7fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'header header header'
    'cards cards cards'
    'cards cards cards';

  @media screen and (max-width: 800px) {
    grid-template-rows: 0.15fr 1.7fr 1fr;
  }
`;

const PageHeader = styled(Header)`
  grid-area: header;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Cards = styled.section`
  grid-area: cards;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const ModalCard = styled.section`
  height: 40vh;
  width: 50vw;
  max-width: 800px;
  min-width: 350px;
  padding: 10px;
  pointer-events: all;
  border: 1px solid #d5cbc5;
  box-shadow: none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const Modal = styled.section`
  position: absolute;
  pointer-events: none;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

export default function Analytics(): JSX.Element {
  const { events, burns } = useTzkt();

  const [isModalOpen, setModalOpen] = useState(false);
  const [buyIns, setBuyIns] = useState<any>();

  const toggleModal = (activeBuyIns?: any) => {
    if (activeBuyIns) {
      setBuyIns(activeBuyIns);
    }

    setModalOpen(!isModalOpen);
  };

  const isActive = (end: Date) => {
    if (end < new Date()) return false;
    return true;
  };

  const sortEvents = (e: any, descend = true) => {
    const sorted = [...e].sort((a, b) => {
      if (a.end > b.end) {
        return descend ? -1 : 1;
      }
      return descend ? 1 : -1;
    });

    return sorted;
  };

  return (
    <>
      <PageWrapper>
        <PageHeader>
          <P>🎰 Salsa Casino Contests</P>
          <P>{burns ? `Total Burn: ${burns} SDAO 🔥` : ''}</P>
        </PageHeader>
        <Cards>
          {events
            ? sortEvents(events).map((proj) => (
                <Card key={proj.buyIns}>
                  <CardHeader>
                    <CardHeaderText>
                      {proj.type} Contest {isActive(proj.end) ? '🟢' : '🔴'}
                    </CardHeaderText>
                    <P>
                      {proj.start.toLocaleDateString('en-en', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </P>
                    <P>{`->`}</P>
                    <P>
                      {proj.end.toLocaleDateString('en-en', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </P>
                  </CardHeader>
                  <CardBody>
                    <CardBox>
                      <P>Total Burn</P>
                      <TokenCopy amount={proj.burn} ticker="SDAO" />
                      <P>Total Buy Ins</P>
                      {proj.participants}
                    </CardBox>
                    <CardBox>
                      <P>Total Pot</P>
                      <P>{proj.pot} ꜩ</P>
                    </CardBox>
                  </CardBody>
                  <CardButton onClick={() => toggleModal(proj.buyIns)}>View</CardButton>
                </Card>
              ))
            : ''}
        </Cards>
      </PageWrapper>
      {isModalOpen ? (
        <Modal>
          <ModalCard>
            <TableModal isOpen={isModalOpen} onClose={toggleModal} data={buyIns} />
            <CardButton
              onClick={() => {
                toggleModal();
              }}
            >
              Close
            </CardButton>
          </ModalCard>
        </Modal>
      ) : (
        ''
      )}
    </>
  );
}
