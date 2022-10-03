import styled from 'styled-components';
import P from './P';

export interface IAppProps {
  ticker: string;
  amount?: number;
  Logo: React.ComponentType;
}

const TokenDetail = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
`;

export default function TokenCopy({ amount = 0, ...props }: IAppProps): JSX.Element {
  const { ticker, Logo } = props;

  return (
    <TokenDetail>
      {amount}&nbsp;
      <P>{ticker}</P>
      <Logo />
    </TokenDetail>
  );
}
