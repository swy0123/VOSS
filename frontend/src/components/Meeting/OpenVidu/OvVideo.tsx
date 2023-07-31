import React, { useEffect, useRef } from 'react';

const OpenViduVideoComponent = (props:any) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (props && !!videoRef.current) {
      props.streamManager.addVideoElement(videoRef.current);
    }

    return () => {
      // 컴포넌트가 unmount될 때 실행될 클린업 함수
      // 예를 들어, 스트림 매니저에서 비디오 엘리먼트를 제거하는 로직을 추가할 수 있습니다.
    };
  }, [props]);

  return <video autoPlay={true} ref={videoRef} />;
};

export default OpenViduVideoComponent;