import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useScroll from '../../hooks/useScroll';
import { logo, btnJoin, btnJoinHand } from '../../assets/image';

const upDown = keyframes`
  from {margin-Top: 1vh;}
  to {margin-Top: 0vh;}
`;
const UpDownImg = styled.img`
  position: absolute;
  left: 50%;
  animation: ${upDown} 0.5s ease-in-out infinite;
  transform: translate(-50%, 0%);
`;

const CenterDiv = styled.div`
  position: absolute;
  width: 32vw;
  height: 13vh;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
function Comp() {
  const { progress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [otherIsVisible, setOtherIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // 分鏡長度~0~3
    // 期間大小由大到小, 超過0.3畫面消失
    setIsVisible(progress > 94);
    setOtherIsVisible(progress < 94);

    if (progress >= 93.5 && progress <= 96.5) {
      setOpacity(0 + 1 * (progress - 93.5) * (1 / 2));
    }
  }, [progress]);
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '10vw',
        paddingRight: '10vw',
      }}
    >
      <CenterDiv
        style={{
          opacity,
          display: 'flex',
          flexDirection: 'column',
          visibility: isVisible ? 'visible' : 'hidden',
        }}
      >
        <div
          style={{
            marginBottom: '5vh',
          }}
        >
          <img
            style={{ width: '100%', height: '100%' }}
            src={logo}
            alt="decorate5"
          />
        </div>
        <div
          style={{
            display: 'flex',
            height: '14vh',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <UpDownImg
            style={{ width: '6vw', alignSelf: 'center' }}
            src={btnJoinHand}
            alt="decorate5"
          />
        </div>
        <div
          style={{
            display: 'contents',
          }}
        >
          <img
            style={{ width: '6vw', alignSelf: 'center', marginTop: '8vh' }}
            src={btnJoin}
            alt="decorate5"
          />
        </div>
        <div
          style={{
            fontSize: '3vw',
            fontWeight: '900',
            color: '#FF0000',
            textAlign: 'center',
            lineHeight: '15vh',
          }}
        >
          立即報名
        </div>
      </CenterDiv>
      <div
        style={{
          // height: '12%',
          // width: '56%',
          alignSelf: 'center',
          display: 'flex',
          position: 'absolute',
          visibility: otherIsVisible ? 'visible' : 'hidden',
          bottom: '1vw',
          right: '2vh',
          height: '15vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '14vh',
            justifyContent: 'center',
          }}
        >
          <UpDownImg
            style={{ width: '6vw', alignSelf: 'center', top: '-35%' }}
            src={btnJoinHand}
            alt="decorate5"
          />
        </div>
        <CenterDiv
          style={{
            display: 'contents',
          }}
        >
          <img
            style={{ width: '6vw', alignSelf: 'center', marginTop: '8vh' }}
            src={btnJoin}
            alt="decorate5"
          />
        </CenterDiv>
      </div>
    </div>
  );
}
export default Comp;
