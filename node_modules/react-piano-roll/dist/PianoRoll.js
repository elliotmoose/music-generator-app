import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import pixiPianoRoll from "./pixiPianoRoll.js";

var PianoRoll = function PianoRoll(props, playbackRef) {
  var container = useRef();
  var pianoRoll = pixiPianoRoll(props);
  useImperativeHandle(playbackRef, function () {
    return pianoRoll.playback;
  });
  useEffect(function () {
    container.current.appendChild(pianoRoll.view);
  });
  return React.createElement("div", {
    ref: container
  });
};

export default forwardRef(PianoRoll);