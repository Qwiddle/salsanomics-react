import styled from 'styled-components';
import P from './P';

export interface IAppProps {
  ticker: string;
  Logo: React.ComponentType;
}

const TokenDetail = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
`;

export default function TokenCopy(props: IAppProps): JSX.Element {
  const { ticker, Logo } = props;

  return (
    <TokenDetail>
      <Logo />
      <P>{ticker}</P>
    </TokenDetail>
  );
}
