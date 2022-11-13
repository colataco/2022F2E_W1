import React, { useEffect, useState } from 'react';
import useScroll from '../../hooks/useScroll';
import { decorate1, decorate5 } from '../../assets/image';

const timeSlot = 9;
function Comp() {
  const { progress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [showPadding, setShowPadding] = useState(true);
  const [delta, setDelta] = useState({ h: '100%', w: '100%' });

  useEffect(() => {
    // 分鏡長度~0~3
    // 期間大小由大到小, 超過0.3畫面消失
    let v = false;
    const obj = {
      h: '100%',
      w: '100%',
    };
    if (progress <= 9) {
      v = true;
      obj.h = `${100 - 100 * (1 / 9) * progress}%`;
      obj.w = `${100 - 100 * (1 / 9) * progress}%`;
      setShowPadding(true);
    }
    setIsVisible(v);
    setDelta(obj);
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
        paddingLeft: showPadding ? '10vw' : '0vw',
        paddingRight: showPadding ? '10vw' : '0vw',
      }}
    >
      <div
        style={{
          height: delta.h,
          width: delta.w,
          justifyContent: 'space-between',
          display: 'flex',
          alignSelf: 'center',
        }}
      >
        <div
          style={{
            height: '26%',
            width: '22%',
            alignSelf: 'center',
          }}
        >
          <img
            style={{ width: '100%', height: '100%' }}
            src={decorate1}
            alt="decorate1"
          />
        </div>
        <div
          style={{
            height: '26%',
            width: '22%',
            alignSelf: 'center',
          }}
        >
          <img
            style={{ width: '100%', height: '100%' }}
            src={decorate5}
            alt="decorate5"
          />
        </div>
      </div>
    </div>
  );
}
export default Comp;
