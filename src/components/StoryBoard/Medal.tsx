import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useScroll from '../../hooks/useScroll';
import { award, decorate3, decorate7 } from '../../assets/image';

const CenterDiv = styled.div`
  position: absolute;
  width: 32vw;
  height: 35vh;
  top: 45%;
  left: 40%;
  display: flex;
  transform: translate(-50%, -50%);
`;
const timeSlot = 9;
function Comp() {
  const { progress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [delta, setDelta] = useState({
    left: '40%',
    opacity: 0,
  });

  useEffect(() => {
    // 分鏡長度~0~3
    // 期間大小由大到小, 超過0.3畫面消失
    setIsVisible(progress <= timeSlot);

    const obj = {
      left: '40%',
      opacity: 0,
    };
    if (progress > 50.7 && progress <= 52.7) {
      obj.left = `${30 + 10 * (progress - 50.7) * (1 / 3)}%`;
      obj.opacity = 0 + 1 * (progress - 50.7) * (1 / 3);
    }
    if (progress > 52.7 && progress <= 54.8) {
      obj.left = '40%';
      obj.opacity = 1;
    }
    if (progress > 54.8 && progress <= 57.8) {
      obj.left = `${40 + 10 * (progress - 54.8) * (1 / 3)}%`;
      obj.opacity = 1 - 1 * (progress - 54.8) * (1 / 3);
    }
    setDelta(obj);
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
          left: delta.left,
          opacity: delta.opacity,
        }}
      >
        <div>
          <img style={{ height: '100%' }} src={award} alt="decorate5" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '2vw',
              fontWeight: '900',
              color: '#FF0000',
            }}
          >
            評審機制
          </div>
          <div
            style={{
              fontSize: '1.5vw',
              color: '#007FAB',
              width: '38vw',
            }}
          >
            初選:將由六角學院前端,UI評審進行第一波篩選
          </div>
          <div
            style={{
              fontSize: '1.5vw',
              color: '#007FAB',
            }}
          >
            決選:由六角學院與贊助廠商討論,進行最後篩選並於12/30(五)由評審進行直播公布名單!
          </div>
          <div
            style={{
              fontSize: '2vw',
              fontWeight: '900',
              color: '#FF0000',
            }}
          >
            獎項
          </div>
          <div
            style={{
              fontSize: '1.5vw',
              color: '#007FAB',
            }}
          >
            1. 初選佳作共六十位 數位獎狀
          </div>
          <div
            style={{
              fontSize: '1.5vw',
              color: '#007FAB',
            }}
          >
            2. 個人企業獎共六位 NTD3,000/位
          </div>
          <div
            style={{
              fontSize: '1.5vw',
              color: '#007FAB',
            }}
          >
            3. 團體企業獎共三組 NTD10,000/組
          </div>
          <div
            style={{
              fontSize: '1.5vw',
              color: '#007FAB',
            }}
          >
            4. 以上皆提供完賽數位獎狀
          </div>
        </div>
      </CenterDiv>
    </div>
  );
}
export default Comp;
