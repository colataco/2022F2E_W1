import React, { useEffect, useState } from 'react';
import useScroll from '../../hooks/useScroll';
import { week1, week2, week3 } from '../../assets/image';

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
    if (progress > 26 && progress <= 29) {
      obj.w1.top = `${60 - 20 * ((progress - 26) / 3)}%`;
      obj.w1.opacity = 0 + 1 * ((progress - 26) / 3);
    } else if (progress > 29 && progress <= 32) {
      obj.w1.top = `${40 - 20 * ((progress - 29) / 3)}%`;
      obj.w1.opacity = 1 - 1 * ((progress - 29) / 3);
    }
    if (progress > 28.3 && progress <= 31.3) {
      obj.w2.top = `${60 - 20 * ((progress - 28.3) / 3)}%`;
      obj.w2.opacity = 0 + 1 * ((progress - 28.3) / 3);
    } else if (progress > 31.3 && progress <= 34.3) {
      obj.w2.top = `${40 - 20 * ((progress - 31.3) / 3)}%`;
      obj.w2.opacity = 1 - 1 * ((progress - 31.3) / 3);
    }
    if (progress > 30 && progress <= 33) {
      obj.w3.top = `${60 - 20 * ((progress - 30) / 3)}%`;
      obj.w3.opacity = 0 + 1 * ((progress - 30) / 3);
    } else if (progress > 33 && progress <= 66) {
      obj.w3.top = `${40 - 20 * ((progress - 33) / 3)}%`;
      obj.w3.opacity = 1 - 1 * ((progress - 33) / 3);
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
        }}
      >
        <div
          style={{
            width: '12vw',
          }}
        >
          <img style={{ width: '12vw' }} src={week1} alt="week1" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '3vw',
              fontWeight: 900,
              color: '#FF5136',
              lineHeight: '5vh',
              fontStyle: 'italic',
            }}
          >
            WEEK1
          </div>
          <div style={{ fontSize: '2vw', fontWeight: 700, color: '#007FAB' }}>
            The F2E 活動網站設計
          </div>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                textAlign: 'center',
                borderRadius: '25px',
                width: '9vw',
                borderColor: '#A46039',
                fontSize: '1vw',
                borderWidth: '8px',
                border: 'solid',
                marginRight: '0.5vw',
              }}
            >
              Parallax Scrolling
            </div>
            <div
              style={{
                textAlign: 'center',
                borderRadius: '25px',
                width: '6vw',
                borderColor: '#A46039',
                fontSize: '1vw',
                borderWidth: '8px',
                border: 'solid',
              }}
            >
              #板塊設計
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '0.5vh',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                borderRadius: '14px',
                background: '#A46039',
                color: '#ffffff',
                width: '6vw',
              }}
            >
              查看關卡細節
            </div>
          </div>
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
          left: '60%',
          display: 'flex',
          flexDirection: 'row-reverse',
        }}
      >
        <div
          style={{
            width: '12vw',
          }}
        >
          <img style={{ width: '12vw' }} src={week2} alt="week1" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '3vw',
              fontWeight: 900,
              color: '#FF5136',
              lineHeight: '5vh',
              fontStyle: 'italic',
              textAlign: 'end',
            }}
          >
            WEEK2
          </div>
          <div
            style={{
              fontSize: '2vw',
              fontWeight: 700,
              color: '#007FAB',
              textAlign: 'end',
            }}
          >
            今晚,我想來點點簽
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div
              style={{
                textAlign: 'center',
                borderRadius: '25px',
                width: '5vw',
                borderColor: '#A46039',
                fontSize: '1vw',
                borderWidth: '8px',
                border: 'solid',
                marginRight: '0.5vw',
              }}
            >
              Canvas
            </div>
            <div
              style={{
                textAlign: 'center',
                borderRadius: '25px',
                width: '8vw',
                borderColor: '#A46039',
                fontSize: '1vw',
                borderWidth: '8px',
                border: 'solid',
              }}
            >
              #凱鈿行動科技
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '0.5vh',
              alignSelf: 'end',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                borderRadius: '14px',
                background: '#A46039',
                color: '#ffffff',
                width: '6vw',
              }}
            >
              查看關卡細節
            </div>
          </div>
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
          left: '20%',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: '12vw',
          }}
        >
          <img style={{ width: '12vw' }} src={week3} alt="week1" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '3vw',
              fontWeight: 900,
              color: '#FF5136',
              lineHeight: '5vh',
              fontStyle: 'italic',
            }}
          >
            WEEK3
          </div>
          <div style={{ fontSize: '2vw', fontWeight: 700, color: '#007FAB' }}>
            Scrum 新手村
          </div>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                textAlign: 'center',
                borderRadius: '25px',
                width: '9vw',
                borderColor: '#A46039',
                fontSize: '1vw',
                borderWidth: '8px',
                border: 'solid',
                marginRight: '0.5vw',
              }}
            >
              JS draggable
            </div>
            <div
              style={{
                textAlign: 'center',
                borderRadius: '25px',
                width: '6vw',
                borderColor: '#A46039',
                fontSize: '1vw',
                borderWidth: '8px',
                border: 'solid',
              }}
            >
              #鈦坦科技
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '0.5vh',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                borderRadius: '14px',
                background: '#A46039',
                color: '#ffffff',
                width: '6vw',
              }}
            >
              查看關卡細節
            </div>
          </div>
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
