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
import { IActiveProject } from '../../const/ecosystem';
import chart from '../../assets/chart.png';

export interface IAnalyticsProps {
  ecosystem: IActiveProject[];
}

const PageWrapper = styled.section`
  padding: 1em;
  background: #f0f0f0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

export default function Analytics(props: IAnalyticsProps): JSX.Element {
  const { ecosystem } = props;

  return (
    <PageWrapper>
      {ecosystem.map((proj) => (
        <Card>
          <CardHeader>
            <CardHeaderText>{proj.name}</CardHeaderText>
          </CardHeader>
          <CardBody>
            <CardBox>
              <P>Token</P>
              <TokenCopy ticker={proj.ticker} Logo={proj.logo} />
            </CardBox>
            <CardBox>
              <P>TVL</P>
              <P>150,123 ꜩ</P>
            </CardBox>
            <CardBox>
              <img src={chart} alt="chart" />
            </CardBox>
          </CardBody>
        </Card>
      ))}
    </PageWrapper>
  );
}
