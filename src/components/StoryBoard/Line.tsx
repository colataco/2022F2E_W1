import React, { useEffect, useState } from 'react';
import useScroll from '../../hooks/useScroll';
import { finishLineL, finishLineR } from '../../assets/image';

const timeSlot = 9;
function Comp() {
  const { progress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [delta, setDelta] = useState({
    left: {
      left: '-2vw',
      top: '50%',
      visible: false,
      height: '26%',
      width: '22%',
      opacity: 1,
    },
    right: {
      right: '-2vw',
      top: '50%',
      visible: false,
      height: '26%',
      width: '22%',
      opacity: 1,
    },
  });

  useEffect(() => {
    // 分鏡長度~0~3
    // 期間大小由大到小, 超過0.3畫面消失
    setIsVisible(progress <= timeSlot);

    const obj = {
      left: {
        left: '-2vw',
        top: '50%',
        visible: false,
        height: '26%',
        width: '22%',
        opacity: 1,
      },
      right: {
        right: '-2vw',
        top: '50%',
        visible: false,
        height: '26%',
        width: '22%',
        opacity: 1,
      },
    };
    if (progress > 82.5 && progress <= 86) {
      obj.left.left = '0%';
      obj.left.visible = true;
      obj.right.right = '0%';
      obj.right.visible = true;
    } else if (progress > 86 && progress <= 91) {
      obj.left.left = `${0 - 20 * (progress - 86) * (1 / 5)}vw`;
      obj.left.visible = true;

      obj.right.right = `${0 - 20 * (progress - 86) * (1 / 5)}vw`;
      obj.right.visible = true;
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
      <div
        style={{
          width: '51%',
          position: 'absolute',
          top: '60%',
          left: delta.left.left,
          visibility: delta.left.visible ? 'visible' : 'hidden',
          alignSelf: 'center',
        }}
      >
        <img
          style={{ width: '100%', height: '100%' }}
          src={finishLineL}
          alt="decorate1"
        />
      </div>
      <div
        style={{
          width: '51%',
          alignSelf: 'center',
          position: 'absolute',
          top: '60%',
          right: delta.right.right,
          visibility: delta.right.visible ? 'visible' : 'hidden',
        }}
      >
        <img
          style={{ width: '100%', height: '100%' }}
          src={finishLineR}
          alt="decorate5"
        />
      </div>
    </div>
  );
}
export default Comp;
