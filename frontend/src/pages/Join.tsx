import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SITE_NAME } from '../utils/JoinConstants';
import JoinForm from '../components/JoinForm';

const Join = () => {
  return (
    <JoinBox>
      <SiteName to="/">{SITE_NAME}</SiteName>
      <JoinForm />
    </JoinBox>
  );
};

export default Join;

const JoinBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SiteName = styled(Link)`
  margin-bottom: 3rem;
  color: black;
  text-decoration: none;
`;
