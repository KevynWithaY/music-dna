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

function MusicDNA() {

  "use strict";

  var DATA_SIZE = 1024;
  var SAVE_SIZE = {
    normal: 'small',
    large: 'large',
    enormous: 'enormous'
  };

  var audioParser = new AudioParser(DATA_SIZE, onAudioDataParsed);
  var audioRenderer = new AudioRenderer();
  var audioData = new Uint8Array(DATA_SIZE);
  var audioDuration = 1;
  var audioTime = 0;
  var audioPlaying = false;
  var time = document.getElementById('time');
  var fileName = '';

  var saveNormal = document.getElementById('save-normal');
  var saveLarge = document.getElementById('save-large');
  var saveEnormous = document.getElementById('save-enormous');
  var saveAndDownload = document.getElementById('save-and-download');
  var saveButtons = document.getElementById('save-and-download-buttons');
  var generateProgress = document.getElementById('generate-progress');

  var getDownload = document.getElementById('get-download');

  function onBeginSave(evt) {

    var size = 0;

    switch(evt.target) {
      case saveNormal: size = 1; break;
      case saveLarge: size = 2; break;
      case saveEnormous: size = 3; break;
    }

    requestAnimFrame(function() {
      var audioRendererHiRes = new AudioRendererHiRes(size, onRenderComplete);
      var audioRenderData = audioRenderer.getRenderData();

      saveButtons.classList.add('hidden');
      generateProgress.classList.add('visible');

      audioRendererHiRes.render(audioRenderData);
    });

  }

  function onRenderComplete(imageData) {

    imageData = imageData.replace(/^data:image\/png;base64,/, '');

    var imageBinaryString = atob(imageData);
    var imageBinaryData = new Uint8Array(imageBinaryString.length);

    // Feels like there should be a nicer way to do this :-/
    for (var i = 0; i < imageBinaryString.length; i++)
      imageBinaryData[i] = imageBinaryString.charCodeAt(i);

    var blob = new Blob([imageBinaryData.buffer],{'type': 'image/png'});

    getDownload.classList.add('visible');
    getDownload.href = window.URL.createObjectURL(blob);
    getDownload.download = fileName;

    generateProgress.classList.remove('visible');
  }

  function onSaveComplete() {
    saveButtons.classList.remove('hidden');
    getDownload.classList.remove('visible');
    generateProgress.classList.remove('visible');
  }

  function onFileRead(evt) {
    audioParser.parseArrayBuffer(evt.target.result);
  }

  function onAudioDataParsed(buffer) {

    audioDuration = buffer.duration;
    audioPlaying = true;

    audioRenderer.clear();
  }

  function updateAndRender() {

    audioParser.getAnalyserAudioData(audioData);
    audioTime = audioParser.getTime() / audioDuration;

    if (audioPlaying) {
      audioRenderer.render(audioData, audioTime);
      time.style.width = (audioTime * 100).toFixed(1) + '%';

      if (audioTime >= 1) {
        saveAndDownload.classList.add('visible');
      } else {
        saveAndDownload.classList.remove('visible');
      }
    }

    requestAnimFrame(updateAndRender);
  }

  this.setName = function (name) {
    fileName = name;
  };

  this.parse = function (file) {
    var fileReader = new FileReader();
    fileReader.addEventListener('loadend', onFileRead);
    fileReader.readAsArrayBuffer(file);
  };

  saveNormal.addEventListener('click', onBeginSave);
  saveLarge.addEventListener('click', onBeginSave);
  saveEnormous.addEventListener('click', onBeginSave);
  getDownload.addEventListener('click', onSaveComplete);

  requestAnimFrame(updateAndRender);
}


}
/*
     FILE ARCHIVED ON 02:31:59 May 31, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:03:06 Feb 25, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.575
  exclusion.robots: 0.018
  exclusion.robots.policy: 0.008
  esindex: 0.016
  cdx.remote: 113.51
  LoadShardBlock: 318.433 (3)
  PetaboxLoader3.datanode: 135.833 (4)
  PetaboxLoader3.resolve: 240.579 (3)
  load_resource: 115.427
*/