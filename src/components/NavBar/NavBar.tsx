import * as React from 'react';
import 'typeface-inter';
import styled from 'styled-components';

const Bar = styled.div`
  width: 100vw;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Links = styled.ul`
  list-style: none;
  display: flex;
  gap: 32px;
`;

const Logo = styled.p`
  min-width: 150px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
`;

const NavItem = styled.li`
  display: inline-block;
  text-decoration: none;
  &:hover: {
    background-color: white;
  }
`;

const LinkText = styled.a`
  color: black;
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  text-transform: capitalize;
  text-decoration: none;
`;

const pages: string[] = ['analytics', 'farm', 'support', 'settings'];

export default function NavBar(): JSX.Element {
  return (
    <div>
      <Bar>
        <Logo>📊 Salsanomics</Logo>
        <Links>
          {pages.map((page) => (
            <NavItem key={page}>
              <LinkText href={`/${page}`}>{page}</LinkText>
            </NavItem>
          ))}
        </Links>
      </Bar>
    </div>
  );
}
