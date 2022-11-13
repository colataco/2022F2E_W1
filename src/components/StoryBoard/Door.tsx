import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useScroll from '../../hooks/useScroll';
import { start, finish, logoText, logo, btnUserP } from '../../assets/image';

const CenterDiv = styled.div`
  display: flex;
  position: absolute;
  visibility: visible;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const timeSlot = 10;
function Comp() {
  const { progress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [delta, setDelta] = useState(start);

  useEffect(() => {
    // 分鏡長度~0~0.4 正常
    // 0.5 下縮, 樹出現
    // 期間大小由大到小, 超過0.3畫面消失
    let v = false;
    let comp = start;
    if (progress <= 9) {
      v = true;
      comp = start;
    } else if (progress >= 81.5 && progress <= 94) {
      v = true;
      comp = finish;
    }
    setIsVisible(v);
    setDelta(comp);
  }, [progress]);
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          // height: '12%',
          // width: '56%',
          alignSelf: 'center',
          display: 'flex',
          position: 'absolute',
          visibility: !isVisible ? 'visible' : 'hidden',
          top: 0,
          left: 0,
          height: '15vh',
        }}
      >
        <img
          style={{ width: '100%', height: '100%' }}
          src={logo}
          alt="logoText"
        />
      </div>
      <div
        style={{
          // height: '12%',
          // width: '56%',
          alignSelf: 'center',
          display: 'flex',
          position: 'absolute',
          visibility: !isVisible ? 'visible' : 'hidden',
          top: 0,
          right: 0,
          height: '15vh',
        }}
      >
        <img
          style={{ width: '100%', height: '100%' }}
          src={btnUserP}
          alt="logoText"
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignSelf: 'center',
        }}
      >
        <CenterDiv
          style={{
            visibility: isVisible ? 'visible' : 'hidden',
          }}
        >
          <img style={{ width: '44vw' }} src={logoText} alt="logoText" />
        </CenterDiv>
        <div
          style={{
            // height: '12%',
            // width: '56%',
            alignSelf: 'center',
            display: 'flex',
            visibility: isVisible ? 'visible' : 'hidden',
          }}
        >
          <img style={{ width: '77vw' }} src={delta} alt="road" />
        </div>
      </div>
    </div>
  );
}
export default Comp;
