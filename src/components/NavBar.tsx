import * as React from 'react';
import 'typeface-inter';
import styled from 'styled-components';

const Bar = styled.div`
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

const Links = styled.ul`
  list-style: none;
  display: flex;
  gap: 32px;
  padding: 0px;
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
  @media screen and (max-width: 600px) {
    padding: 2px;
  }
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
