import * as React from 'react';
import ConnectWallet from './ConnectWallet';
import { Nav, NavItem, NavItems, Logo, A } from './Nav';

const pages: string[] = ['casino', 'farm', 'settings'];

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
