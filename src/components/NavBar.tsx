import * as React from 'react';
import 'typeface-inter';
import styled from 'styled-components';

const Nav = styled.div`
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: 100px;
  }
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  gap: 32px;
  padding: 0px;
  @media screen and (max-width: 600px) {
    gap: 18px;
  }
`;

const NavItem = styled.li`
  display: inline-block;
  text-decoration: none;
  &:hover: {
    background-color: white;
  }
`;

const Logo = styled.p`
  min-width: 130px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
`;

const A = styled.a`
  color: black;
  font-family: 'Inter';
  font-size: 16px;
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

const pages: string[] = ['analytics', 'farm', 'support', 'settings'];

export default function NavBar(): JSX.Element {
  return (
    <Nav>
      <Logo>📊 Salsanomics</Logo>
      <NavItems>
        {pages.map((page) => (
          <NavItem key={page}>
            <A href={`/${page}`}>{page}</A>
          </NavItem>
        ))}
      </NavItems>
    </Nav>
  );
}
