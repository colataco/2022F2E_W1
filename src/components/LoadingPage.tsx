import React from 'react';
import styled from 'styled-components';

const MiddleText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: rgba(31, 69, 100, 1);
  font-size: 16px;
`;

const LoadingPage = function () {
  return <MiddleText>Loading...</MiddleText>;
};
export default LoadingPage;
