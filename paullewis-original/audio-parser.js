var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/**
 * Copyright 2014 Google Inc. All Rights Reserved.
 * For licensing see http://lab.aerotwist.com/canvas/music-dna/LICENSE
 */

window.AudioContext =
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.msAudioContext ||
  window.oAudioContext ||
  window.AudioContext;

function AudioParser(dataSize, onAudioDataDecoded) {

  "use strict";

  var audioContext = new AudioContext();
  var analyser = audioContext.createAnalyser();
  var gainNode = audioContext.createGain();
  var sourceNode = null;
  var audioRenderer = null;
  var audioDecodedCallback = null;
  var timePlaybackStarted = 0;

  analyser.smoothingTimeConstant = 0.2;
  analyser.fftSize = dataSize;

  gainNode.gain.value = 0.5;
  audioDecodedCallback = onAudioDataDecoded;

  function onDecodeData (buffer) {

    // Kill any existing audio
    if (sourceNode) {
      if (sourceNode.playbackState === sourceNode.PLAYING_STATE)
        sourceNode.stop();

      sourceNode = null;
    }

    // Make a new source
    if (!sourceNode) {

      sourceNode = audioContext.createBufferSource();
      sourceNode.loop = false;

      sourceNode.connect(gainNode);
      gainNode.connect(analyser);
      analyser.connect(audioContext.destination);
    }

    // Set it up and play it
    sourceNode.buffer = buffer;
    sourceNode.start();

    timePlaybackStarted = Date.now();

    audioDecodedCallback(buffer);

  }

  function onError() {
    alert("Hmm, couldn't parse that file. Try something else?");
  }

  this.getAnalyserAudioData = function (arrayBuffer) {
    analyser.getByteFrequencyData(arrayBuffer);
  };

  this.parseArrayBuffer = function (arrayBuffer) {
    audioContext.decodeAudioData(arrayBuffer, onDecodeData, onError);
  };

  this.getTime = function() {
    return (Date.now() - timePlaybackStarted) * 0.001;
  };

}


}
/*
     FILE ARCHIVED ON 20:26:42 May 30, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:03:06 Feb 25, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.94
  exclusion.robots: 0.017
  exclusion.robots.policy: 0.007
  esindex: 0.009
  cdx.remote: 6.159
  LoadShardBlock: 130.871 (3)
  PetaboxLoader3.datanode: 163.636 (4)
  load_resource: 148.348
  PetaboxLoader3.resolve: 62.348
*/