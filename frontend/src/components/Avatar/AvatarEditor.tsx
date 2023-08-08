import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Face from "react-nice-avatar";
import Hair from "react-nice-avatar";
import Hat from "react-nice-avatar";
import Eyes from "react-nice-avatar";
import Glasses from "react-nice-avatar";
import Ear from "react-nice-avatar";
import Nose from "react-nice-avatar";
import Mouth from "react-nice-avatar";
import Shirt from "react-nice-avatar";
//import SectionWrapper from "./SectionWrapper/index";

function AvatarEditor({ config, shape, updateConfig, updateShape, download }) {
  const [isCodeShow, setIsCodeShow] = useState(false);
  const myDefaultOptions = genDefaultOptions(defaultOptions);
  const shapes = ['circle', 'rounded', 'square'];

  function genDefaultOptions(opts) {
    const hairSet = new Set(opts.hairStyleMan.concat(opts.hairStyleWoman));
    return {
      ...opts,
      hairStyle: Array.from(hairSet)
    };
  }

  function switchConfig(type, currentOpt) {
    const opts = myDefaultOptions[type];
    const currentIdx = opts.findIndex(item => item === currentOpt);
    const newIdx = (currentIdx + 1) % opts.length;
    updateConfig(type, opts[newIdx]);
  }

  function switchShape(currentShape) {
    const currentIdx = shapes.findIndex(item => item === currentShape);
    const newIdx = (currentIdx + 1) % shapes.length;
    updateShape(shapes[newIdx]);
  }

  function toggleCodeShow() {
    setIsCodeShow(prevShow => !prevShow);
  }

  function genCodeString(config) {
    const ignoreAttr = ['id'];
    const myConfig = Object.keys(config)
      .filter(key => !ignoreAttr.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: config[key] }), {});
    return (
      `const config = ${JSON.stringify(myConfig, null, 2)}\n` +
      'const myConfig = genConfig(config)\n' +
      '<NiceAvatar style={{ width: "5rem", height: "5rem" }} {...myConfig} />'
    );
  }

  return (
    <div className="AvatarEditor rounded-full px-3 py-2 flex items-center">
      {/* Face */}
      <SectionWrapper
        className="w-8 h-8 rounded-full p-2 mx-2"
        tip="Face"
        switchConfig={() => switchConfig('faceColor', config.faceColor)}>
        <Face color={config.faceColor} />
      </SectionWrapper>
      {/* Hair style */}
      <SectionWrapper
        className="w-8 h-8 rounded-full p-2 mx-2"
        tip="Hair"
        switchConfig={() => switchConfig('hairStyle', config.hairStyle)}>
        <Hair style={config.hairStyle} color="#fff" colorRandom />
      </SectionWrapper>
      {/* Hat style */}
      <SectionWrapper
        className="w-8 h-8 rounded-full p-2 mx-2"
        tip="Hat"
        switchConfig={() => switchConfig('hatStyle', config.hatStyle)}>
        <Hat style={config.hatStyle} color="#fff" />
      </SectionWrapper>
      {/* Eyes style */}
      <SectionWrapper
        className="w-8 h-8 rounded-full p-2 mx-2"
        tip="Eyes"
        switchConfig={() => switchConfig('eyeStyle', config.eyeStyle)}>
        <Eyes style={config.eyeStyle} color="#fff" />
      </SectionWrapper>
      {/* Glasses style */}
      <SectionWrapper
        className="w-8 h-8 rounded-full p-2 mx-2"
        tip="Glasses"
        switchConfig={() => switchConfig('glassesStyle', config.glassesStyle)}>
        <Glasses style={config.glassesStyle} color="#fff" />
      </SectionWrapper>
      {/* Ear style */}
      <SectionWrapper
        className="w-8 h-8 rounded-full p-2 mx-2"
        tip="Ear"
        switchConfig={() => switchConfig('earSize', config.earSize)}>
        <Ear size={config.earSize} color="#fff" />
      </SectionWrapper>
      {/* Nose style */}
      <SectionWrapper
        className="w-8 h-8 rounded-full p-2 mx-2"
        tip="Nose"
        switchConfig={() => switchConfig('noseStyle', config.noseStyle)}>
        <Nose style={config.noseStyle} color="#fff" />
      </SectionWrapper>
      {/* Mouth style */}
      <SectionWrapper
        className="w-8 h-8 rounded-full p-2 mx-2"
        tip="Mouth"
        switchConfig={() => switchConfig('mouthStyle', config.mouthStyle)}>
        <Mouth style={config.mouthStyle} color="#fff" />
      </SectionWrapper>
      {/* Shirt style */}
      <SectionWrapper
        className="w-8 h-8 rounded-full p-2 mx-2"
        tip="Shirt"
        switchConfig={() => switchConfig('shirtStyle', config.shirtStyle)}>
        <Shirt style={config.shirtStyle} color="#fff" />
      </SectionWrapper>
      {/* Shape style */}
      <SectionWrapper
        className="w-8 h-8 rounded-full p-2 mx-2"
        tip="Shape"
        switchConfig={() => switchShape(shape)}>
        <div
          className={classnames("w-3 h-3 bg-white", {
            "rounded-full": shape === 'circle',
            "rounded": shape === 'rounded'
          })} />
      </SectionWrapper>
      <div className="divider w-0.5 h-5 rounded mx-2" />
      <div className="mx-2 relative flex justify-center">
        <i
          className={classnames("iconfont icon-code text-xl  cursor-pointer transition duration-300 hover:text-green-100", {
            banTip: isCodeShow
          })}
          data-tip="Config"
          onClick={toggleCodeShow} />
        <div className={classnames("rounded-lg bg-white p-5 absolute bottom-full codeBlock mb-4", {
          active: isCodeShow
        })}>
          <pre className="text-xs highres:text-sm">{genCodeString(config)}</pre>
        </div>
      </div>
      <div className="divider w-0.5 h-5 rounded mx-2" />
      <i
        className="iconfont icon-download text-xl mx-2 cursor-pointer transition duration-300 hover:text-green-100"
        data-tip="Download"
        onClick={download} />
    </div>
  );
}

AvatarEditor.propTypes = {
  config: PropTypes.object.isRequired,
  shape: PropTypes.string.isRequired,
  updateConfig: PropTypes.func.isRequired,
  updateShape: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired
}


export default AvatarEditor;
