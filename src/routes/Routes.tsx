import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Guard from './Guard';

const RoutesComp = function () {
  return (
    <Router>
      <Guard />
    </Router>
  );
};
export default RoutesComp;
