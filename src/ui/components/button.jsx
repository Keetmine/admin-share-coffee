import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Button = styled.button`
    cursor: pointer;
    border: 2px solid rgba(0, 100, 255, 0.3);
    box-sizing: border-box;
    border-radius: 20px;
    background: white;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #0064FF;
    transition: 0.5s all ease-out;
    padding: 5px 25px;
    &:hover {
        background: #0064FF;
        color: white;
    }
`;
export const ButtonText = styled.span`
    font-family:  Roboto, sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 16px;
    color: #FF0032;
    text-align: center;
    cursor: pointer;
    &:hover {
        color: #ff476b;
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
