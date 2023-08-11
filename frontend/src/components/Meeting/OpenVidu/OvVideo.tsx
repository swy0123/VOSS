import React, { useEffect, useRef } from "react";
import {  Video } from "./UserVideoComponent.style";

const OpenViduVideoComponent = (props: any) => {
  const videoRef = useRef(null);

  // useEffect(() => {
  //   console.log("OpenViduVideoComponent props")
  //   console.log(props)
  //   return () => {
  //   };
  // }, []);
  useEffect(() => {
    if (props && !!videoRef.current) {
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props]);

  return <Video autoPlay={true} ref={videoRef} muted={props.isMuted}/>
};

export default OpenViduVideoComponent;
