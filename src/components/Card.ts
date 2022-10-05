import styled from 'styled-components';

export const Card = styled.div`
  width: 300px;
  height: 65%;
  display: flex;
  padding: 10px;
  gap: 10px;
  flex-direction: column;
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

export const CardButton = styled.button`
  appearance: none;
  background-color: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292e;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
  &:hover {
    background-color: #f3f4f6;
    text-decoration: none;
    transition-duration: 0.1s;
  }
  &:disabled {
    background-color: #fafbfc;
    border-color: rgba(27, 31, 35, 0.15);
    color: #959da5;
    cursor: default;
  }
  &:active {
    background-color: #edeff2;
    box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
    transition: none 0s;
  }
  &:focus {
    outline: 1px transparent;
  }
  &:before {
    display: none;
  }
`;
