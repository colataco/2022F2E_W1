import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useScroll from '../../hooks/useScroll';
import {
  question1,
  question2,
  question3,
  bgTalking,
  btnJoin,
} from '../../assets/image';
import { getDelta } from '../../utils';

const leftToRight = keyframes`
  from {opacity: 0; margin-left: -3vw;}
  to {opacity: 1;}
`;
const rightToLeft = keyframes`
  from {opacity: 0; margin-Left: 3vw;}
  to {opacity: 1;}
`;
const fadeIn = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;
const LeftToRightImg = styled.img`
  animation: ${leftToRight} 1.5s ease-in-out 1;
`;
const RightToLeftImg = styled.img`
  width: 20vw;
  animation: ${rightToLeft} 1.5s ease-in-out 1;
`;
const FadeInImg = styled.img`
  animation: ${fadeIn} 1s ease-in-out 1;
`;
const CenterDiv = styled.div`
  position: absolute;
  width: 32vw;
  height: 13vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BtnFadeInImg = styled.img`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${fadeIn} 1s ease-in-out 1;
  width: 6vw;
`;
const LeftBtnFadeInImg = styled.img`
  position: absolute;
  top: 35%;
  right: 0%;
  transform: translate(0%, -50%);
  animation: ${fadeIn} 1s ease-in-out 1;
  width: 6vw;
`;
const RightBtnFadeInImg = styled.img`
  position: absolute;
  top: 35%;
  left: 0%;
  transform: translate(0%, -50%);
  animation: ${fadeIn} 1s ease-in-out 1;
  width: 6vw;
`;
const LeftToRightDiv = styled.div`
  background-color: #0fe03f;
  flex-grow: 1;
  width: 0vw;
`;
// animation: ${leftToRight} 2s ease-in-out infinite;
const timeSlot = 0.3;
function Comp() {
  const { progress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    if (progress <= 10) {
      setDelta(51);
    } else if (progress > 10 && progress < 15) {
      setDelta(51 - 15 * getDelta(progress, 10, 15));
    }
    setIsVisible(progress <= timeSlot);
  }, [progress]);

  const prepareTopQuestion = () => {
    if (progress >= 11 && progress <= 20) {
      let opacity = 1;
      if (progress >= 11 && progress <= 14) {
        // fade in
        opacity = 0 + 1 * getDelta(progress, 11, 14);
      } else if (progress >= 18 && progress <= 20) {
        // fade in
        opacity = 1 - 1 * getDelta(progress, 18, 20);
      }
      return (
        <div style={{ opacity }}>
          <CenterDiv>
            <img style={{ width: '100%' }} src={bgTalking} alt="bgTalking" />
          </CenterDiv>
          <CenterDiv
            style={{
              fontSize: '3vw',
              fontWeight: '900',
              color: '#007FAB',
              textAlign: 'center',
              lineHeight: '15vh',
            }}
          >
            你是否也有以下困擾
          </CenterDiv>
        </div>
      );
    }
    if (progress >= 23 && progress <= 25) {
      return (
        <>
          <CenterDiv style={{ width: '36vw' }}>
            <img style={{ width: '100%' }} src={bgTalking} alt="bgTalking" />
          </CenterDiv>
          <CenterDiv
            style={{
              fontSize: '3vw',
              fontWeight: '900',
              color: '#007FAB',
              textAlign: 'center',
              lineHeight: '15vh',
              width: '36vw',
            }}
          >
            本屆主題:互動式網頁設計
          </CenterDiv>
        </>
      );
    }
    if (progress > 25 && progress <= 41.2) {
      let opacity = 1;
      if (progress >= 25 && progress <= 28) {
        // fade in
        opacity = 0 + 1 * getDelta(progress, 25, 28);
      } else if (progress >= 39.2 && progress <= 41.2) {
        // fade in
        opacity = 1 - 1 * getDelta(progress, 39.2, 41.2);
      }
      return (
        <div style={{ opacity }}>
          <CenterDiv style={{ width: '39vw' }}>
            <img style={{ width: '100%' }} src={bgTalking} alt="bgTalking" />
          </CenterDiv>
          <CenterDiv
            style={{
              fontSize: '3vw',
              fontWeight: '900',
              color: '#007FAB',
              textAlign: 'center',
              lineHeight: '15vh',
              width: '39vw',
            }}
          >
            年度最強活動,三大主題來襲
          </CenterDiv>
        </div>
      );
    }
    if (progress > 51.7 && progress <= 58.7) {
      return (
        <>
          <CenterDiv style={{ width: '36vw' }}>
            <img style={{ width: '100%' }} src={bgTalking} alt="bgTalking" />
          </CenterDiv>
          <CenterDiv
            style={{
              fontSize: '3vw',
              fontWeight: '900',
              color: '#007FAB',
              textAlign: 'center',
              lineHeight: '15vh',
              width: '36vw',
            }}
          >
            還有比賽等著你
          </CenterDiv>
        </>
      );
    }
    if (progress > 58.7 && progress <= 62.7) {
      return (
        <>
          <CenterDiv style={{ width: '17vw' }}>
            <img
              style={{ width: '100%', height: '86%' }}
              src={bgTalking}
              alt="bgTalking"
            />
          </CenterDiv>
          <CenterDiv
            style={{
              fontSize: '3vw',
              fontWeight: '900',
              color: '#007FAB',
              textAlign: 'center',
              lineHeight: '9vh',
              width: '17vw',
            }}
          >
            贊助單位
          </CenterDiv>
        </>
      );
    }
    return null;
  };

  const prepareLeftQuestion = () => {
    if (progress >= 13 && progress <= 20) {
      return (
        <LeftToRightImg
          style={{ width: '55vh' }}
          src={question1}
          alt="question1"
        />
      );
    }
    if (progress >= 21 && progress <= 24.2) {
      return <LeftBtnFadeInImg src={btnJoin} alt="btnJoin" />;
    }
    return null;
  };

  const prepareCenterQuestion = () => {
    if (progress >= 15 && progress <= 20) {
      return (
        <FadeInImg style={{ width: '55vh' }} src={question2} alt="question2" />
      );
    }
    if (progress >= 21 && progress <= 24.2) {
      return <BtnFadeInImg src={btnJoin} alt="btnJoin" />;
    }
    return null;
  };

  const prepareRightQuestion = () => {
    if (progress >= 16 && progress <= 20) {
      return (
        <RightToLeftImg
          style={{ width: '55vh' }}
          src={question3}
          alt="question3"
        />
      );
    }
    if (progress >= 21 && progress <= 24.2) {
      return <RightBtnFadeInImg src={btnJoin} alt="btnJoin" />;
    }
    return null;
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingLeft: '10vw',
        paddingRight: '10vw',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1.2,
          position: 'relative',
        }}
      >
        {prepareTopQuestion()}
      </div>
      <div
        style={{
          flex: 2.4,
          display: 'flex',
        }}
      >
        <div
          style={{
            flex: 1,
            position: 'relative',
            // width: '0vw',
            // height: '0vh',
          }}
        >
          {prepareLeftQuestion()}
        </div>
        <div
          style={{
            flex: 1,
            position: 'relative',
            // width: '0vw',
            // height: '0vh',
          }}
        >
          {prepareCenterQuestion()}
        </div>
        <div
          style={{
            flex: 1,
            position: 'relative',
            // width: '0vw',
            // height: '0vh',
          }}
        >
          {prepareRightQuestion()}
        </div>
      </div>
      <div
        style={{
          flex: 1.7,
        }}
      />
    </div>
  );
}
export default Comp;
