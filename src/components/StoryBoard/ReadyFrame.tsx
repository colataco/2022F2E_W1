import React, { useEffect, useState } from 'react';
import useScroll from '../../hooks/useScroll';
import { readyFrame, ready1, ready2, ready3 } from '../../assets/image';

const timeSlot = 0.3;
function Comp() {
  const { progress } = useScroll();
  const [isVisible, setIsVisible] = useState({
    r1: true,
    r2: true,
    r3: true,
    frame: true,
  });
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    // 分鏡長度~0~0.3
    // 期間大小由大到小, 超過0.3畫面消失
    let vObj = {
      r1: false,
      r2: false,
      r3: false,
      frame: false,
    };
    if (progress === 0) {
      vObj = {
        r1: true,
        r2: true,
        r3: true,
        frame: true,
      };
    } else if (progress > 0 && progress <= 3) {
      vObj = {
        r1: false,
        r2: false,
        r3: true,
        frame: true,
      };
    } else if (progress > 3 && progress <= 6) {
      vObj = {
        r1: false,
        r2: true,
        r3: false,
        frame: true,
      };
    } else if (progress > 6 && progress < 10) {
      vObj = {
        r1: true,
        r2: false,
        r3: false,
        frame: true,
      };
    }
    setIsVisible(vObj);
  }, [progress]);
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        visibility: isVisible.frame ? 'visible' : 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'flex-end',
          display: 'flex',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '5%',
            alignSelf: 'center',
            position: 'absolute',
            right: '9.7vw',
            visibility: isVisible.r3 ? 'visible' : 'hidden',
          }}
        >
          <img
            style={{ width: '100%', height: '100%' }}
            src={ready3}
            alt="ready3"
          />
        </div>
        <div
          style={{
            height: '5%',
            alignSelf: 'center',
            position: 'absolute',
            right: '6.4vw',
            visibility: isVisible.r2 ? 'visible' : 'hidden',
          }}
        >
          <img
            style={{ width: '100%', height: '100%' }}
            src={ready2}
            alt="ready2"
          />
        </div>
        <div
          style={{
            height: '5%',
            alignSelf: 'center',
            position: 'absolute',
            right: '3.3vw',
            visibility: isVisible.r1 ? 'visible' : 'hidden',
          }}
        >
          <img
            style={{ width: '100%', height: '100%' }}
            src={ready1}
            alt="ready1"
          />
        </div>
        <div
          style={{
            height: '10%',
            width: '14%',
            alignSelf: 'center',
            zIndex: 1,
          }}
        >
          <img
            style={{ width: '100%', height: '100%' }}
            src={readyFrame}
            alt="decorate1"
          />
        </div>
      </div>
    </div>
  );
}
export default Comp;
