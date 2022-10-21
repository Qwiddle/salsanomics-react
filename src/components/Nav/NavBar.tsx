import * as React from 'react';
import 'typeface-inter';
import ConnectWallet from './ConnectWallet';
import { Nav, NavItem, NavItems, Logo, A } from './Nav';

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
      <ConnectWallet>Connect Wallet</ConnectWallet>
    </Nav>
  );
}