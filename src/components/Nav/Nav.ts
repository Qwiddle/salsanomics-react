import styled from 'styled-components';

export const Nav = styled.div`
  height: 80px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    height: 170px;
    gap: 20px;
  }
`;

export const NavItems = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 32px;
  padding: 0;
  @media screen and (max-width: 700px) {
    gap: 18px;
    order: 2;
  }
`;

export const NavItem = styled.li`
  display: inline-block;
  text-decoration: none;
  &:hover: {
    background-color: white;
  }
`;

export const Logo = styled.p`
  min-width: 149px;
  font-family: 'Inter';
  font-style: normal;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  text-transform: capitalize;
  margin: 0;
  @media screen and (max-width: 700px) {
    padding: 10px;
    order: 1;
  }
`;

export const A = styled.a`
  color: black;
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  text-transform: capitalize;
  text-decoration: none;
  position: relative;
  padding-bottom: 5px;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    background-color: black;
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
  }
  &:hover:after {
    opacity: 1;
    transform: translate3d(0, 0.2em, 0);
  }
`;
