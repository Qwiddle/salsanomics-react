import styled from 'styled-components';

export const Card = styled.div`
  min-width: 340px;
  min-height: 400px;
  display: flex;
  padding: 10px;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #fcfcfc;
  box-shadow: 0px 80px 105px rgba(0, 0, 0, 0.07),
    0px 10px 13px rgba(0, 0, 0, 0.03);
  border-radius: 24px 24px 24px 24px;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 250px;
  min-height: 40px;
  background: #f0f0f0;
  border-radius: 8px;
`;

export const CardHeaderText = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
`;

export const CardBox = styled.div`
  min-width: 80px;
  min-height: 50px;
  border-radius: 8px;
  background: #f0f0f0;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const CardBody = styled.div`
  flex: 1;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
