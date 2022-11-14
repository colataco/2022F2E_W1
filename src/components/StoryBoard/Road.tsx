import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useScroll from '../../hooks/useScroll';
import {
  characterF2e,
  characterTeam,
  characterUi,
  road,
} from '../../assets/image';

const leftCharDown = keyframes`
  0% {
    transform: scale(1);
    
  }
  100% {
    transform: scale(0.6);
    margin-top: 18vh;
    margin-left: 4vw;
  }
`;
const leftCharDown2 = keyframes`
  0% {
    transform: scale(1);
    
  }
  100% {
    transform: scale(0.4);
    margin-top: 23vh;
    margin-left: 9vw;
  }
`;
const leftCharDown3 = keyframes`
  0% {
    transform: scale(0.4);
    margin-top: 23vh;
    margin-left: 9vw;
  }
  100% {
    transform: scale(0.6);
    margin-top: 18vh;
    margin-left: 4vw;
  }
`;
const leftCharDown4 = keyframes`
  0% {
    transform: scale(0.6);
    margin-top: 18vh;
    margin-left: 4vw;
  }
  100% {
    transform: scale(0.8);
    margin-top: 14vh;
    margin-left: 4vw;
  }
`;
const roadDown = keyframes`
  0% {
    transform: scale(1);
    
  }
  100% {
    transform: scale(0.8);
    margin-top: 3vh;
  }
`;
const roadDown2 = keyframes`
  0% {
    transform: scale(1);
    
  }
  100% {
    transform: scale(0.5);
    margin-top: 4vh;
  }
`;
const roadDown3 = keyframes`
  0% {
    transform: scale(0.5);
    margin-top: 4vh;
  }
  100% {
    transform: scale(0.7);
    margin-top: 2vh;
  }
`;
const midCharDown = keyframes`
  0% {
    transform: scale(1);
    
  }
  100% {
    transform: scale(0.6);
    margin-top: 17vh;
  }
`;
const midCharDown2 = keyframes`
  0% {
    transform: scale(1);
    
  }
  100% {
    transform: scale(0.4);
    margin-top: 23vh;
  }
`;
const midCharDown3 = keyframes`
  0% {
    transform: scale(0.4);
    margin-top: 22vh;
  }
  100% {
    transform: scale(0.6);
    margin-top: 17vh;
  }
`;
const midCharDown4 = keyframes`
  0% {
    transform: scale(0.6);
    margin-top: 17vh;
    
  }
  100% {
    transform: scale(0.8);
    margin-top: 14vh;
  }
`;
const rightCharDown = keyframes`
  0% {
    transform: scale(1);
    
  }
  100% {
    transform: scale(0.6);
    margin-top: 17vh;
    margin-left: -5vw;
  }
`;
const rightCharDown2 = keyframes`
  0% {
    transform: scale(1);
    
  }
  100% {
    transform: scale(0.4);
    margin-top: 22vh;
    margin-left: -10vw;
  }
`;
const rightCharDown3 = keyframes`
  0% {
    transform: scale(0.4);
    margin-top: 22vh;
    margin-left: -10vw;
  }
  100% {
    transform: scale(0.6);
    margin-top: 17vh;
    margin-left: -6vw;
  }
`;
const rightCharDown4 = keyframes`
  0% {
    transform: scale(0.6);
    margin-top: 17vh;
    margin-left: -6vw;
  }
  100% {
    transform: scale(0.8);
    margin-top: 13vh;
    margin-left: -6vw;
  }
`;
const NormalCharImg = styled.img`
  position: absolute;
  width: 17vw;
  top: 7vh;
`;
const NormalRightCharImg = styled.img`
  position: absolute;
  top: 13vh;
  width: 17vw;
`;
const LeftCharImg = styled.img`
  position: absolute;
  animation: ${leftCharDown} 0.5s ease-in-out 1;
  width: 17vw;
  animation-fill-mode: forwards;
  z-index: 1;
`;
const LeftCharImgL2 = styled.img`
  position: absolute;
  animation: ${leftCharDown2} 0.5s ease-in-out 1;
  width: 17vw;
  animation-fill-mode: forwards;
  z-index: 1;
`;
const LeftCharImgL3 = styled.img`
  position: absolute;
  animation: ${leftCharDown3} 0.5s ease-in-out 1;
  width: 17vw;
  animation-fill-mode: forwards;
  z-index: 1;
`;
const LeftCharImgL4 = styled.img`
  position: absolute;
  animation: ${leftCharDown4} 0.5s ease-in-out 1;
  width: 17vw;
  animation-fill-mode: forwards;
  z-index: 1;
`;
const MidCharImg = styled.img`
  position: absolute;
  animation: ${midCharDown} 0.5s ease-in-out 1;
  width: 17vw;
  animation-fill-mode: forwards;
  z-index: 1;
`;
const MidCharImgL2 = styled.img`
  position: absolute;
  animation: ${midCharDown2} 0.5s ease-in-out 1;
  width: 17vw;
  animation-fill-mode: forwards;
  z-index: 1;
`;
const MidCharImgL3 = styled.img`
  position: absolute;
  animation: ${midCharDown3} 0.5s ease-in-out 1;
  width: 17vw;
  animation-fill-mode: forwards;
  z-index: 1;
`;
const MidCharImgL4 = styled.img`
  position: absolute;
  animation: ${midCharDown4} 0.5s ease-in-out 1;
  width: 17vw;
  animation-fill-mode: forwards;
  z-index: 1;
`;
const RoadImg = styled.img`
  animation: ${roadDown} 0.5s ease-in-out 1;
  width: 17vw;
  animation-fill-mode: forwards;
`;
const RoadImgL2 = styled.img`
  animation: ${roadDown2} 0.5s ease-in-out 1;
  width: 17vw;
  animation-fill-mode: forwards;
`;
const RoadImgL3 = styled.img`
  animation: ${roadDown3} 0.5s ease-in-out 1;
  width: 17vw;
  animation-fill-mode: forwards;
`;
const RightCharImg = styled.img`
  position: absolute;
  top: 6vh;
  animation: ${rightCharDown} 0.5s ease-in-out 1;
  animation-fill-mode: forwards;
  width: 17vw;
  z-index: 1;
`;
const RightCharImgL2 = styled.img`
  position: absolute;
  top: 6vh;
  animation: ${rightCharDown2} 0.5s ease-in-out 1;
  animation-fill-mode: forwards;
  width: 17vw;
  z-index: 1;
`;
const RightCharImgL3 = styled.img`
  position: absolute;
  top: 6vh;
  animation: ${rightCharDown3} 0.5s ease-in-out 1;
  animation-fill-mode: forwards;
  width: 17vw;
  z-index: 1;
`;
const RightCharImgL4 = styled.img`
  position: absolute;
  top: 6vh;
  animation: ${rightCharDown4} 0.5s ease-in-out 1;
  animation-fill-mode: forwards;
  width: 17vw;
  z-index: 1;
`;
const timeSlot = 0.3;
function Comp() {
  const { progress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [delta, setDelta] = useState(0);

  const prepareCharImg = (position: any) => {
    if (position === 'left') {
      if (progress > 10 && progress < 20) {
        return <LeftCharImg src={characterF2e} alt="characterF2e" />;
      }
      if (progress > 24 && progress < 39.2) {
        return <LeftCharImgL2 src={characterF2e} alt="characterF2e" />;
      }
      if (progress > 39.2 && progress < 47) {
        return <LeftCharImgL3 src={characterF2e} alt="characterF2e" />;
      }
      if (progress > 50.7 && progress < 60.1) {
        return <LeftCharImg src={characterF2e} alt="characterF2e" />;
      }
      if (progress >= 60.1 && progress < 75) {
        return <LeftCharImgL4 src={characterF2e} alt="characterF2e" />;
      }
      if (progress >= 84 && progress < 94) {
        return (
          <NormalCharImg
            style={{
              width: `${17 + 18 * (1 / 10) * (progress - 84)}vw`,
              top: `${8 - 40 * (1 / 10) * (progress - 84)}vh`,
              left: `${0 - 9 * (1 / 10) * (progress - 84)}vw`,
            }}
            src={characterF2e}
            alt="characterF2e"
          />
        );
      }
      if (progress > 94) {
        return null;
      }
      return <NormalCharImg src={characterF2e} alt="characterF2e" />;
    }
    if (position === 'mid') {
      if (progress > 10 && progress < 20) {
        return <MidCharImg src={characterUi} alt="characterF2e" />;
      }
      if (progress > 24 && progress < 39.2) {
        return <MidCharImgL2 src={characterUi} alt="characterF2e" />;
      }
      if (progress > 39.2 && progress < 47) {
        return <MidCharImgL3 src={characterUi} alt="characterF2e" />;
      }
      if (progress > 50.7 && progress < 65) {
        return <MidCharImg src={characterUi} alt="characterF2e" />;
      }
      if (progress >= 60.1 && progress < 75) {
        return <MidCharImgL4 src={characterUi} alt="characterF2e" />;
      }
      if (progress >= 84 && progress < 94) {
        return (
          <NormalCharImg
            style={{
              width: `${17 + 18 * (1 / 10) * (progress - 84)}vw`,
              top: `${8 - 40 * (1 / 10) * (progress - 84)}vh`,
              left: `${0 - 9 * (1 / 10) * (progress - 84)}vw`,
              zIndex: 1,
            }}
            src={characterUi}
            alt="characterUi"
          />
        );
      }
      if (progress > 94) {
        return null;
      }
      return <NormalCharImg src={characterUi} alt="characterF2e" />;
    }
    if (position === 'right') {
      if (progress > 10 && progress < 20) {
        return <RightCharImg src={characterTeam} alt="characterF2e" />;
      }
      if (progress > 24 && progress < 39.2) {
        return <RightCharImgL2 src={characterTeam} alt="characterF2e" />;
      }
      if (progress > 39.2 && progress < 47) {
        return <RightCharImgL3 src={characterTeam} alt="characterF2e" />;
      }
      if (progress > 50.7 && progress < 65) {
        return <RightCharImg src={characterTeam} alt="characterF2e" />;
      }
      if (progress >= 60.1 && progress < 75) {
        return <RightCharImgL4 src={characterTeam} alt="characterF2e" />;
      }
      if (progress >= 84 && progress < 94) {
        return (
          <NormalRightCharImg
            style={{
              width: `${17 + 18 * (1 / 10) * (progress - 84)}vw`,
              top: `${13 - 40 * (1 / 10) * (progress - 84)}vh`,
              left: `${0 - 9 * (1 / 10) * (progress - 84)}vw`,
            }}
            src={characterTeam}
            alt="characterUi"
          />
        );
      }
      if (progress > 94) {
        return null;
      }
      return <NormalRightCharImg src={characterTeam} alt="characterF2e" />;
    }
    if (position === 'road') {
      if (progress > 10 && progress < 20) {
        return (
          <RoadImg
            style={{ width: '100%', height: '100%' }}
            src={road}
            alt="road"
          />
        );
      }
      if (progress > 24 && progress < 39.2) {
        return (
          <RoadImgL2
            style={{ width: '100%', height: '100%' }}
            src={road}
            alt="road"
          />
        );
      }
      if (progress > 39.2 && progress < 47) {
        return (
          <RoadImgL3
            style={{ width: '100%', height: '100%' }}
            src={road}
            alt="road"
          />
        );
      }
      if (progress > 50.7 && progress < 65) {
        return (
          <RoadImg
            style={{ width: '100%', height: '100%' }}
            src={road}
            alt="road"
          />
        );
      }
      return (
        <img style={{ width: '100%', height: '100%' }} src={road} alt="road" />
      );
    }
    return null;
  };
  useEffect(() => {
    // 分鏡長度~0~0.4 正常
    // 0.5 下縮, 樹出現
    // 期間大小由大到小, 超過0.3畫面消失
    if (progress <= 10) {
      setDelta(51);
    } else if (progress > 10 && progress < 15) {
      setDelta(51 - (15 * (progress - 10)) / 5);
    } else if (progress > 20 && progress <= 22) {
      setDelta(36 + (15 * (progress - 20)) / 3);
    }
    setIsVisible(progress <= timeSlot);
  }, [progress]);
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingLeft: '10vw',
        paddingRight: '10vw',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'absolute',
          visibility: 'visible',
        }}
      >
        {progress}
      </div>
      <div
        style={{
          display: 'flex',
          alignSelf: 'center',
          width: '51vw',
          flexDirection: 'column',
          height: '60vh',
        }}
      >
        <div
          style={{
            flex: 3,
            display: 'flex',
          }}
        >
          <div
            style={{
              flex: 1,
              position: 'relative',
            }}
          >
            {prepareCharImg('left')}
          </div>
          <div
            style={{
              flex: 1,
              position: 'relative',
            }}
          >
            {prepareCharImg('mid')}
          </div>
          <div
            style={{
              flex: 1,
              position: 'relative',
            }}
          >
            {prepareCharImg('right')}
          </div>
        </div>
        <div
          style={{
            // height: '12%',
            // width: '56%',
            flex: 1,
            alignSelf: 'center',
            display: 'flex',
          }}
        >
          {prepareCharImg('road')}
        </div>
      </div>
    </div>
  );
}
export default Comp;
