import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useScroll from '../../hooks/useScroll';
import { decorate9, road } from '../../assets/image';

const timeSlot = 0.3;
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;
const TestStyledDiv = styled.div`
  height: 26%;
  width: 22%;
  align-self: flex-end;
  margin-bottom: -10vh;
`;

const ReverseImg = styled.img`
  height: 100%;
  width: 100%;
  transform: scaleX(-1);
`;
// animation: ${spin} 2s linear infinite;
function Comp() {
  const { progress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [delta, setDelta] = useState(0);
  const [topDelta, setTopDelta] = useState(0);

  useEffect(() => {
    // 分鏡長度~0~0.4 正常
    // 0.5 下縮, 樹出現
    // 期間大小由大到小, 超過0.3畫面消失
    setIsVisible(progress >= 12 && progress <= 18);
    if (progress >= 13 && progress <= 18) {
      setDelta(100 - (50 * (progress - 13)) / 5);
      setTopDelta(24 * ((progress - 13) / 5));
    } else {
      setDelta(1 / timeSlot);
    }
  }, [progress]);
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        visibility: isVisible ? 'visible' : 'hidden',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '17vw',
        paddingRight: '17vw',
      }}
    >
      <div
        style={{
          height: `${delta}%`,
          width: `${delta}%`,
          justifyContent: 'space-between',
          display: 'flex',
          alignSelf: 'center',
          marginTop: `${topDelta}vh`,
        }}
      >
        <TestStyledDiv>
          <img
            style={{ width: '100%', height: '100%' }}
            src={decorate9}
            alt="decorate9"
          />
        </TestStyledDiv>
        <div
          style={{
            height: '26%',
            width: '22%',
            alignSelf: 'flex-end',
            marginBottom: '-10vh',
          }}
        >
          <ReverseImg src={decorate9} alt="decorate9" />
        </div>
      </div>
    </div>
  );
}
export default Comp;
