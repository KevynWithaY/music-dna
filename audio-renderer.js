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
  var baseRadius = 0;  // Store the initial radius
  var radiusStep = 0;  // How much to increase radius per pass

  function onResize() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    baseRadius = Math.min(width, height) * 0.25;  // Start with a smaller initial radius
    outerRadius = baseRadius;
    radiusStep = Math.min(width, height) * 0.08;  // Space between each pass

    ctx.globalCompositeOperation = "lighter";

  }

  function clamp(val, min, max) {
    return Math.min(max, Math.max(val, min));
  }

  this.clear = function() {
    ctx.clearRect(0, 0, width, height);
  };

  this.render = function(audioData, normalizedPosition) {
    // Calculate which pass we're on (0-3)
    var currentPass = Math.floor(normalizedPosition * 4);
    // Calculate position within current pass (0-1)
    var passPosition = (normalizedPosition * 4) % 1;
    
    // Update outer radius based on current pass
    outerRadius = baseRadius + (currentPass * radiusStep);

    var angle = Math.PI - passPosition * TAU;
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

      if (volume < 0.75)
        continue;

      // Adjust color based on current pass
      color = (currentPass * 90) + passPosition * 90 + Math.random() * 24;
      color = Math.round(color % 360);

      lnDataDistance = (Math.log(a - 4) / LOG_MAX) - BASE;

      distance = lnDataDistance * outerRadius;
      size = volume * MAX_DOT_SIZE + Math.random() * 2;

      if (Math.random() > 0.995) {
        size *= (audioData[a] * 0.2) * Math.random();
        volume *= Math.random() * 0.25;
      }

      ctx.globalAlpha = volume * 0.09;
      ctx.fillStyle = 'hsl(' + color + ', 80%, 50%)';
      ctx.beginPath();
      ctx.arc(
        midX + x * distance,
        midY + y * distance,
        size, 0, TAU, false);
      ctx.closePath();
      ctx.fill();
    }


  };

  window.addEventListener('resize', onResize, false);
  window.addEventListener('load', function() {
    onResize();
  }, false);
}
