import React, { useEffect, useState } from 'react';
import useScroll from '../../hooks/useScroll';
import { decorate1, decorate5, decorate3, decorate7 } from '../../assets/image';

const timeSlot = 9;
function Comp() {
  const { progress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [delta, setDelta] = useState({
    left: {
      left: '-2vw',
      top: '50%',
      visible: false,
      comp: decorate3,
      height: '26%',
      width: '22%',
      opacity: 1,
    },
    right: {
      right: '-2vw',
      top: '50%',
      visible: false,
      comp: decorate7,
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
        comp: decorate3,
        height: '26%',
        width: '22%',
        opacity: 1,
      },
      right: {
        right: '-2vw',
        top: '50%',
        visible: false,
        comp: decorate7,
        height: '26%',
        width: '22%',
        opacity: 1,
      },
    };
    if (progress > 46.8 && progress <= 50.8) {
      obj.left.left = `${-2 + 12 * (progress - 46.8) * (1 / 4)}vw`;
      obj.left.top = `${50 - 12 * (progress - 46.8) * (1 / 4)}%`;
      obj.left.visible = true;

      obj.right.right = `${-2 + 12 * (progress - 46.8) * (1 / 4)}vw`;
      obj.right.top = `${50 - 12 * (progress - 46.8) * (1 / 4)}%`;
      obj.right.visible = true;
    }
    if (progress > 74 && progress <= 82) {
      obj.left.left = `${-6 + 20 * (progress - 74) * (1 / 8)}vw`;
      obj.left.top = `${50 - 12 * (progress - 74) * (1 / 8)}%`;
      obj.left.height = `${46 - 20 * (progress - 74) * (1 / 8)}%`;
      obj.left.width = `${42 - 20 * (progress - 74) * (1 / 8)}%`;
      obj.left.visible = true;
      obj.left.comp = decorate1;

      obj.right.right = `${-6 + 20 * (progress - 74) * (1 / 8)}vw`;
      obj.right.top = `${50 - 12 * (progress - 74) * (1 / 8)}%`;
      obj.right.height = `${46 - 20 * (progress - 74) * (1 / 8)}%`;
      obj.right.width = `${42 - 20 * (progress - 74) * (1 / 8)}%`;
      obj.right.visible = true;
      obj.right.comp = decorate5;

      if (progress > 74 && progress <= 78) {
        obj.left.opacity = 0.3 + 1 * (progress - 74) * (1 / 4);
        obj.right.opacity = 0.3 + 1 * (progress - 74) * (1 / 4);
      } else if (progress > 78 && progress <= 82) {
        obj.left.opacity = 1 - 1 * (progress - 78) * (1 / 4);
        obj.right.opacity = 1 - 1 * (progress - 78) * (1 / 4);
      }
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
          height: delta.left.height,
          width: delta.left.width,
          position: 'absolute',
          top: delta.left.top,
          left: delta.left.left,
          opacity: delta.left.opacity,
          visibility: delta.left.visible ? 'visible' : 'hidden',
          alignSelf: 'center',
        }}
      >
        <img
          style={{ width: '100%', height: '100%' }}
          src={delta.left.comp}
          alt="decorate1"
        />
      </div>
      <div
        style={{
          height: delta.right.height,
          width: delta.right.width,
          alignSelf: 'center',
          position: 'absolute',
          top: delta.right.top,
          right: delta.right.right,
          opacity: delta.right.opacity,
          visibility: delta.right.visible ? 'visible' : 'hidden',
        }}
      >
        <img
          style={{ width: '100%', height: '100%' }}
          src={delta.right.comp}
          alt="decorate5"
        />
      </div>
    </div>
  );
}
export default Comp;
