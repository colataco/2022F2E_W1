import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useScroll from '../../hooks/useScroll';
import {
  dateLine,
  dateStart,
  dateWeekLine,
  dateUpload,
  btnJoin,
} from '../../assets/image';

const fadeIn = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;
const FadeInDiv = styled.div`
  animation: ${fadeIn} 1.5s ease-in-out 1;
`;

const timeSlot = 10;
function Comp() {
  const { progress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [delta, setDelta] = useState({
    left: false,
    center: false,
    right: false,
    ground: false,
  });

  useEffect(() => {
    // 分鏡長度~0~0.4 正常
    // 0.5 下縮, 樹出現
    // 期間大小由大到小, 超過0.3畫面消失
    setIsVisible(progress <= timeSlot);
    const obj = {
      left: false,
      center: false,
      right: false,
      ground: false,
    };
    if (progress >= 39.7 && progress <= 46) {
      obj.ground = true;
    }
    if (progress >= 41.2 && progress <= 46) {
      obj.left = true;
    }
    if (progress >= 42.7 && progress <= 46) {
      obj.center = true;
    }
    if (progress >= 44.2 && progress <= 46) {
      obj.right = true;
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
        justifyContent: 'flex-start',
        flexDirection: 'column',
      }}
    >
      {delta.ground ? (
        <div
          style={{
            alignSelf: 'center',
            display: 'flex',
            position: 'absolute',
            visibility: !isVisible ? 'visible' : 'hidden',
            top: '50%',
            paddingLeft: '10vw',
            paddingRight: '10vw',
            width: '100vw',
          }}
        >
          <img
            style={{ width: '100%', height: '100%' }}
            src={dateLine}
            alt="dateLine"
          />
        </div>
      ) : null}
      <div
        style={{
          alignSelf: 'center',
          display: 'flex',
          position: 'absolute',
          visibility: !isVisible ? 'visible' : 'hidden',
          top: '25vh',
          paddingLeft: '10vw',
          paddingRight: '10vw',
          width: '100vw',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {delta.left ? (
            <>
              <div
                style={{
                  alignSelf: 'center',
                }}
              >
                <img style={{ height: '7vh' }} src={btnJoin} alt="btnJoin" />
              </div>
              <div
                style={{ fontSize: '3vw', fontWeight: '700', color: '#ff0000' }}
              >
                SIGN UP
              </div>
              <div
                style={{
                  fontSize: '2vw',
                  backgroundColor: '#007FAB',
                  borderRadius: '30px',
                  textAlign: 'center',
                  width: '11vw',
                }}
              >
                10/13-11/6
              </div>
              <div>截止前可修改報名組別</div>
              <div>
                <img
                  style={{ width: '0.95vw' }}
                  src={dateWeekLine}
                  alt="dateLine"
                />
              </div>
            </>
          ) : null}
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '-4vh',
          }}
        >
          {delta.center ? (
            <>
              <div
                style={{
                  alignSelf: 'center',
                }}
              >
                <img style={{ height: '7vh' }} src={dateStart} alt="btnJoin" />
              </div>
              <div
                style={{ fontSize: '3vw', fontWeight: '700', color: '#ff0000' }}
              >
                START
              </div>
              <div
                style={{
                  fontSize: '2vw',
                  backgroundColor: '#007FAB',
                  borderRadius: '30px',
                  textAlign: 'center',
                  width: '11vw',
                }}
              >
                10/31-11/28
              </div>
              <div>10/31(一) UI,團體組開賽</div>
              <div>
                <img
                  style={{ width: '0.95vw' }}
                  src={dateWeekLine}
                  alt="dateLine"
                />
              </div>
            </>
          ) : null}
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {delta.right ? (
            <>
              <div
                style={{
                  alignSelf: 'center',
                }}
              >
                <img style={{ height: '7vh' }} src={dateUpload} alt="btnJoin" />
              </div>
              <div
                style={{ fontSize: '3vw', fontWeight: '700', color: '#ff0000' }}
              >
                UPLOAD
              </div>
              <div
                style={{
                  fontSize: '2vw',
                  backgroundColor: '#007FAB',
                  borderRadius: '30px',
                  textAlign: 'center',
                  width: '11vw',
                }}
              >
                10/31-11/28
              </div>
              <div>依賽程登錄作品</div>
              <div>
                <img
                  style={{ width: '0.95vw' }}
                  src={dateWeekLine}
                  alt="dateLine"
                />
              </div>
            </>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
export default Comp;
