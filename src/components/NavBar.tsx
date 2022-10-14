import * as React from 'react';
import 'typeface-inter';
import styled from 'styled-components';
import { CardButton } from './Card';

const Nav = styled.div`
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

const NavItems = styled.ul`
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

const NavItem = styled.li`
  display: inline-block;
  text-decoration: none;
  &:hover: {
    background-color: white;
  }
`;

const Logo = styled.p`
  min-width: 149px;
  font-family: 'Inter';
  font-style: normal;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
  margin: 0;
  @media screen and (max-width: 700px) {
    padding: 10px;
    order: 1;
  }
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

const WalletButton = styled(CardButton)`
  appearance: none;
  line-height: 20px;
  margin-left: auto;
  @media screen and (max-width: 700px) {
    margin-right: auto;
    order: 3;
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
      <WalletButton>Connect Wallet</WalletButton>
    </Nav>
  );
}
