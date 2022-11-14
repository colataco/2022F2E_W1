/* eslint-disable react/function-component-definition */
import React, { lazy, useEffect, useContext, Suspense } from 'react';
import { decorate1 } from '../assets/image';
import Cloud from '../components/StoryBoard/Cloud';
import Cloud2 from '../components/StoryBoard/Cloud2';
import ReadyFrame from '../components/StoryBoard/ReadyFrame';
import Road from '../components/StoryBoard/Road';
import RoadSideTree from '../components/StoryBoard/RoadSideTree';
import Door from '../components/StoryBoard/Door';
import Question from '../components/StoryBoard/Question';
import WeekCard from '../components/StoryBoard/WeekCard';
import DateLine from '../components/StoryBoard/DateLine';
import Medal from '../components/StoryBoard/Medal';
import Sponsor from '../components/StoryBoard/Sponsor';
import Line from '../components/StoryBoard/Line';
import Final from '../components/StoryBoard/Final';

const Home: React.FC<any> = () => (
  <div
    style={{
      height: '700vh',
      overflow: 'show',
      position: 'relative',
      backgroundColor: '#FFC37D',
    }}
  >
    <Cloud />
    <Cloud2 />
    <ReadyFrame />
    <RoadSideTree />
    <Door />
    <Road />
    <Question />
    <WeekCard />
    <DateLine />
    <Medal />
    <Sponsor />
    <Line />
    <Final />
  </div>
);
export default Home;
