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

window.requestAnimFrame =
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.requestAnimationFrame;

(function() {

  var musicDNA = new MusicDNA();
  var fileDropArea = document.getElementById('file-drop-area');
  var artist = document.getElementById('artist');
  var track = document.getElementById('track');
  var fileUploadForm = document.getElementById('file-chooser');
  var fileInput = document.getElementById('source-file');

  fileDropArea.addEventListener('drop', dropFile, false);
  fileDropArea.addEventListener('dragover', cancel, false);
  fileDropArea.addEventListener('dragenter', cancel, false);
  fileDropArea.addEventListener('dragexit', cancel, false);
  fileUploadForm.addEventListener('submit', onSubmit, false);

  function onSubmit(evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();

    if (fileInput.files.length)
      go(fileInput.files[0]);
  }

  function cancel(evt) {
    evt.preventDefault();
  }

  function dropFile(evt) {

    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;

    if (files.length) {
      go(files[0]);
    }
  }

  function go(file) {
    musicDNA.parse(file);
    fileDropArea.classList.add('dropped');

    ID3.loadTags("filename.mp3", function() {
      var tags = ID3.getAllTags("filename.mp3");
      if (tags.artist)
        artist.textContent = tags.artist;
      if (tags.title)
        track.textContent = tags.title;

      musicDNA.setName(tags.artist + ' - ' + tags.title);
    }, {
      dataReader: FileAPIReader(file)
    });
  }

})();


}
/*
     FILE ARCHIVED ON 21:00:57 May 30, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:03:06 Feb 25, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.593
  exclusion.robots: 0.026
  exclusion.robots.policy: 0.016
  esindex: 0.011
  cdx.remote: 23.182
  LoadShardBlock: 70.338 (3)
  PetaboxLoader3.datanode: 99.568 (4)
  load_resource: 106.039
  PetaboxLoader3.resolve: 43.919
*/