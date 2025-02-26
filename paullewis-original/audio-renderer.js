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

function AudioRenderer() {
  "use strict";

  var LOG_MAX = Math.log(128);
  var TAU = Math.PI * 2;
  var MAX_DOT_SIZE = 0.5;
  var BASE = Math.log(4) / LOG_MAX;

  var canvas = document.getElementById('render-area');
  var ctx = canvas.getContext('2d');

  var width = 0;
  var height = 0;
  var outerRadius = 0;
  var renderData = {
    width: 0,
    height: 0,
    values: [],
    radius: 0
  };

  function onResize() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    outerRadius = Math.min(width, height) * 0.47;

    canvas.width = width;
    canvas.height = height;

    renderData.width = width;
    renderData.height = height;
    renderData.radius = outerRadius;

    ctx.globalCompositeOperation = "lighter";

  }

  function clamp(val, min, max) {
    return Math.min(max, Math.max(val, min));
  }

  this.clear = function() {
    ctx.clearRect(0, 0, width, height);
    renderData.values.length = 0;
  };

  this.render = function(audioData, normalizedPosition) {

    var angle = Math.PI - normalizedPosition * TAU;
    var color = 0;
    var lnDataDistance = 0;
    var distance = 0;
    var size = 0;
    var volume = 0;
    var power = 0;

    var x = Math.sin(angle);
    var y = Math.cos(angle);
    var midX = width * 0.5;
    var midY = height * 0.5;

    // There is so much number hackery in here.
    // Number fishing is HOW YOU WIN AT LIFE.

    for (var a = 16; a < audioData.length; a++) {

      volume = audioData[a] / 255;

      if (volume < 0.73)
        continue;

      color = normalizedPosition - 0.12 + Math.random() * 0.24;
      color = Math.round(color * 360);

      lnDataDistance = (Math.log(a - 4) / LOG_MAX) - BASE;

      distance = lnDataDistance * outerRadius;
      size = volume * MAX_DOT_SIZE + Math.random() * 2;

      if (Math.random() > 0.995) {
        size *= (audioData[a] * 0.2) * Math.random();
        volume *= Math.random() * 0.25;
      }

      var renderVals = {
        alpha: volume * 0.09,
        color: color,
        x: x * distance,
        y: y * distance,
        size: size
      };

      ctx.globalAlpha = renderVals.alpha;
      ctx.fillStyle = 'hsl(' + renderVals.color + ', 80%, 50%)';
      ctx.beginPath();
      ctx.arc(
        midX + renderVals.x,
        midY + renderVals.y,
        renderVals.size, 0, TAU, false);
      ctx.closePath();
      ctx.fill();

      renderData.values.push(renderVals);
    }
  };

  this.getRenderData = function() {
    return renderData;
  };

  window.addEventListener('resize', onResize, false);
  window.addEventListener('load', function() {
    onResize();
  }, false);
}


}
/*
     FILE ARCHIVED ON 21:43:15 May 30, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:03:06 Feb 25, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.645
  exclusion.robots: 0.051
  exclusion.robots.policy: 0.01
  esindex: 0.01
  cdx.remote: 18.584
  LoadShardBlock: 120.013 (3)
  PetaboxLoader3.datanode: 157.615 (4)
  load_resource: 132.514
  PetaboxLoader3.resolve: 86.001
*/