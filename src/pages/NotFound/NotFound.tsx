import styled from 'styled-components';
import Header from '../../components/Typography/Header';

const PageWrapper = styled.main`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const BigHeader = styled(Header)`
  overflow: hidden;
  white-space: nowrap;
  font-weight: 500;
  margin: 0 auto;
  animation: typing 1.5s steps(40, end);
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

const TextContainer = styled.section``;

export default function Analytics(): JSX.Element {
  return (
    <PageWrapper>
      <TextContainer>
        <BigHeader>this page does not exist.</BigHeader>
      </TextContainer>
    </PageWrapper>
  );
}
