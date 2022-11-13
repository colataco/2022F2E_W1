import React, { useEffect, useState } from 'react';
import useScroll from '../../hooks/useScroll';
import {
  logoBlockstudio,
  logoKdanmobile,
  logoTitansoft,
} from '../../assets/image';

const timeSlot = 0.3;
function Comp() {
  const { progress } = useScroll();
  const [isVisible, setIsVisible] = useState({
    r1: true,
    r2: true,
    r3: true,
    frame: true,
  });
  const [delta, setDelta] = useState({
    w1: {
      top: '50%',
      opacity: 0,
    },
    w2: {
      top: '50%',
      opacity: 0,
    },
    w3: {
      top: '50%',
      opacity: 0,
    },
  });

  useEffect(() => {
    // 分鏡長度~0~0.3
    // 期間大小由大到小, 超過0.3畫面消失
    const obj = {
      w1: {
        top: '60%',
        opacity: 0,
      },
      w2: {
        top: '60%',
        opacity: 0,
      },
      w3: {
        top: '60%',
        opacity: 0,
      },
    };
    if (progress > 58 && progress <= 65) {
      obj.w1.top = `${35 - 15 * ((progress - 58) / 7)}%`;
      obj.w1.opacity = 0 + 1 * ((progress - 58) / 7);
    } else if (progress > 65 && progress <= 70) {
      obj.w1.top = '20%';
      obj.w1.opacity = 1;
    } else if (progress > 70 && progress <= 75) {
      obj.w1.top = `${20 - 20 * ((progress - 70) / 5)}%`;
      obj.w1.opacity = 1 - 1 * ((progress - 70) / 5);
    }
    if (progress > 59 && progress <= 66) {
      obj.w2.top = `${35 - 15 * ((progress - 59) / 7)}%`;
      obj.w2.opacity = 0 + 1 * ((progress - 59) / 7);
    } else if (progress > 66 && progress <= 70) {
      obj.w2.top = '20%';
      obj.w2.opacity = 1;
    } else if (progress > 70 && progress <= 75) {
      obj.w2.top = `${20 - 20 * ((progress - 70) / 5)}%`;
      obj.w2.opacity = 1 - 1 * ((progress - 70) / 5);
    }
    if (progress > 60 && progress <= 67) {
      obj.w3.top = `${35 - 15 * ((progress - 60) / 7)}%`;
      obj.w3.opacity = 0 + 1 * ((progress - 60) / 7);
    } else if (progress > 67 && progress <= 70) {
      obj.w3.top = '20%';
      obj.w3.opacity = 1;
    } else if (progress > 70 && progress <= 75) {
      obj.w3.top = `${20 - 20 * ((progress - 70) / 5)}%`;
      obj.w3.opacity = 1 - 1 * ((progress - 70) / 5);
    }
    setDelta(obj);
  }, [progress]);
  const prepareW1 = () => {
    console.log(progress);

    return (
      <div
        style={{
          position: 'absolute',
          top: delta.w1.top,
          opacity: delta.w1.opacity,
          left: '20%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            width: '18vw',
          }}
        >
          <img style={{ width: '18vw' }} src={logoBlockstudio} alt="week1" />
        </div>
        <div
          style={{
            textAlign: 'center',
            borderRadius: '25px',
            width: '8vw',
            borderColor: '#A46039',
            fontSize: '1.5vw',
            borderWidth: '8px',
            border: 'solid',
            alignSelf: 'center',
            marginTop: '1vh',
          }}
        >
          #板塊設計
        </div>
      </div>
    );
  };
  const prepareW2 = () => {
    console.log(progress);

    return (
      <div
        style={{
          position: 'absolute',
          top: delta.w2.top,
          opacity: delta.w2.opacity,
          left: '40%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            width: '18vw',
          }}
        >
          <img style={{ width: '18vw' }} src={logoTitansoft} alt="week1" />
        </div>
        <div
          style={{
            textAlign: 'center',
            borderRadius: '25px',
            width: '8vw',
            borderColor: '#A46039',
            fontSize: '1.5vw',
            borderWidth: '8px',
            border: 'solid',
            alignSelf: 'center',
            marginTop: '1vh',
          }}
        >
          #鈦坦設計
        </div>
      </div>
    );
  };
  const prepareW3 = () => {
    console.log(progress);

    return (
      <div
        style={{
          position: 'absolute',
          top: delta.w3.top,
          opacity: delta.w3.opacity,
          left: '60%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            width: '18vw',
          }}
        >
          <img style={{ width: '18vw' }} src={logoKdanmobile} alt="week1" />
        </div>
        <div
          style={{
            textAlign: 'center',
            borderRadius: '25px',
            width: '8vw',
            borderColor: '#A46039',
            fontSize: '1.5vw',
            borderWidth: '8px',
            border: 'solid',
            alignSelf: 'center',
            marginTop: '1vh',
          }}
        >
          #凱鈿科技
        </div>
      </div>
    );
  };
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
        {prepareW1()}
        {prepareW2()}
        {prepareW3()}
      </div>
    </div>
  );
}
export default Comp;
