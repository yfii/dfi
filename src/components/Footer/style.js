import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-around !important;
  width: 40rem !important;
  height: auto !important;
  margin: 2rem auto 6rem !important;
  @media only screen and (min-width: 769px) {
    margin: 2rem auto 10rem !important;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Link = styled.a`
  margin: 0.5rem 0;
  font-weight: 400;
  color: #000;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LinkIcon = styled.i`
  margin-right: .5rem;
  min-width: 24px;
`;

const FAIcon = p => {
  return <LinkIcon className={`fas fa-${p.type}`}></LinkIcon>;
};

const BrandIcon = p => {
  return <LinkIcon className={`fab fa-${p.type}`}></LinkIcon>;
};

const LinkLabel = styled.span``;

export { Container, Column, Title, Link, FAIcon, BrandIcon, LinkLabel };
