import styled from 'styled-components';

export const Card = styled.div`
  min-width: 340px;
  height: 400px;
  display: flex;
  padding: 10px;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #fcfcfc;
  box-shadow: 0px 80px 105px rgba(0, 0, 0, 0.07), 0px 10px 13px rgba(0, 0, 0, 0.03);
  border-radius: 24px 24px 24px 24px;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 250px;
  min-height: 40px;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
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
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const CardBody = styled.div`
  flex: 1;
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
