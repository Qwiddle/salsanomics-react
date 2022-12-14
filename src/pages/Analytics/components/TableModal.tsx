/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  border: 2px solid #f9ebe2;
  font-size: 0.9em;
  overflow-y: scroll;
  display: table-caption;
  height: 100%;
  width: 100%;
`;

const TBody = styled.tbody`
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
  width: 100%;
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

const sortBuyIns = (e: any, descend = true) => {
  const sorted = [...e].sort((a, b) => {
    if (a.count > b.count) {
      return descend ? -1 : 1;
    }
    return descend ? 1 : -1;
  });

  return sorted;
};

const filterBuyIns = (buyIns: any) => {
  const counts: any = {};

  buyIns.forEach((num: any) => {
    counts[num.sender] = counts[num.sender] ? counts[num.sender] + 1 : 1;
  });

  const filtered = buyIns
    .filter((value: any, index: any, self: any) => index === self.findIndex((t: any) => t.sender === value.sender))
    .map((b: any) => {
      const address = counts[b.sender];

      return {
        ...b,
        count: address,
      };
    });

  return filtered;
};

export default function TableModal({ ...props }: IModalProps): JSX.Element {
  const { isOpen, onClose, data } = props;

  const filteredData = sortBuyIns(filterBuyIns(data));

  return isOpen ? (
    <Table>
      <THead>
        <TR>
          <TH>Address</TH>
          <TH>ꜩ spent</TH>
        </TR>
      </THead>
      <TBody>
        {filteredData
          ? filteredData.map((b: any) => (
              <TR key={b.sender}>
                <TD>{b.sender}</TD>
                <TD>{Number(b.amount) * b.count}</TD>
              </TR>
            ))
          : ''}
      </TBody>
    </Table>
  ) : (
    <div />
  );
}
