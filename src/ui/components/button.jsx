import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;

  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

export const ButtonLink = styled(Link)`
    font-style: normal;
    font-size: 16px;
    color: #6b6a6a;
    transition: 0.3s all ease-out;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    &:hover {
        color: #701429;
    }
`;
