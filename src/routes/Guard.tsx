import React, { lazy, useEffect, useContext, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from 'antd';
import PATH from './PathConstants';
import LoadingPage from '../components/LoadingPage';

const { Header, Content, Footer } = Layout;
const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 50px);
  overflow: hidden;
`;

const NotFound = function () {
  return <>404</>;
};

const WaitingComponent = (Component: any) =>
  function (props: any) {
    return (
      <Suspense fallback={<LoadingPage />}>
        <Component {...props} />
      </Suspense>
    );
  };

// component
const HelloComp = lazy(() => import('../containers/Hello'));
const HomeComp = lazy(() => import('../containers/Home'));

// router mapping
const appRoutes = [
  {
    path: PATH.HELLO_WORLD,
    element: WaitingComponent(HelloComp),
  },
  {
    path: PATH.HOME,
    element: WaitingComponent(HomeComp),
  },
];
//
const RouterGuard: React.FC<any> = function () {
  return (
    // function RouterGuard() {
    <Layout>
      <Content style={{ height: '100vh' }}>
        <Routes>
          {appRoutes.map((config) => (
            <Route
              path={config.path}
              key={config.path}
              element={<config.element />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Content>
    </Layout>
  );
};
export default RouterGuard;
