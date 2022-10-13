/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  border: 2px solid #f9ebe2;
  font-size: 0.9em;
  overflow-y: scroll;
  height: 50vh;
  display: table-caption;
  width: 100%;
  table-layout: fixed;
`;

const TBody = styled.tbody`
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;

const THead = styled.thead`
  background-color: #f9ebe2;
  color: #000000;
  text-align: left;
`;

const TH = styled.th`
  padding: 12px 15px;
  min-width: 50px;
`;

const TD = styled.td`
  padding: 12px 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TR = styled.tr`
  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  &:last-of-type {
    border-bottom: 2px solid #f9ebe2;
  }
`;

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export default function TableModal({ ...props }: IModalProps): JSX.Element {
  const { isOpen, onClose, data } = props;

  return isOpen ? (
    <Table>
      <THead>
        <TR>
          <TH>Address</TH>
          <TH>ꜩ</TH>
        </TR>
      </THead>
      <TBody>
        {data
          ? data.map((b: any) => (
              <TR>
                <TD>{b.sender.address}</TD>
                <TD>{Number(b.amount) / 10 ** 6}</TD>
              </TR>
            ))
          : ''}
      </TBody>
    </Table>
  ) : (
    <div />
  );
}
