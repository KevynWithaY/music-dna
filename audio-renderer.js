/**
 * Copyright 2014 Google Inc. All Rights Reserved.
 * For licensing see http://lab.aerotwist.com/canvas/music-dna/LICENSE
 */

function AudioRenderer() {
  "use strict";

  // Re-maps a number from one range to another
  function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }

  var LOG_MAX = Math.log(128);
  var TAU = Math.PI * 2;
  var MAX_DOT_SIZE = 0.5;
  var BASE = Math.log(4) / LOG_MAX;
  //var WAVEFORM_RADIUS = 20; // Radius for the center waveform
  //var WAVEFORM_WIDTH = 1.0; // Width of the waveform line

  var dnaCanvas = document.getElementById('dna-canvas');
  //var waveformCanvas = document.getElementById('waveform-canvas');
  var dnaCtx = dnaCanvas.getContext('2d');
  //var waveformCtx = waveformCanvas.getContext('2d', { alpha: true });

  var width = 0;
  var height = 0;
  var outerRadius = 0;
  var baseRadius = 0;  // Store the initial radius
  var radiusStep = 0;  // How much to increase radius per pass

  function onResize() {
    dnaCanvas.width = dnaCanvas.offsetWidth;
    dnaCanvas.height = dnaCanvas.offsetHeight;
    //waveformCanvas.width = waveformCanvas.offsetWidth;
    //waveformCanvas.height = waveformCanvas.offsetHeight;

    width = dnaCanvas.width;
    height = dnaCanvas.height;

    baseRadius = Math.min(width, height) * 0.25;  // Start with a smaller initial radius
    outerRadius = baseRadius;
    radiusStep = Math.min(width, height) * 0.09;  // Space between each pass

    dnaCtx.globalCompositeOperation = "lighter";
  }

  function clamp(val, min, max) {
    return Math.min(max, Math.max(val, min));
  }

  this.clear = function() {
    dnaCtx.clearRect(0, 0, width, height);
  };

  // /**
  //  * Clears the center of the canvas for a given radius (defaults to
  //  * half the base visualization radius).
  //  * Ex: audioRenderer.clearCenter(); or audioRenderer.clearCenter(50);
  //  * @param {number} [radius] Radius in pixels (optional)
  //  */
  // this.clearCenter = function(radius) {
  //   var centerRadius = radius || baseRadius * 0.5; // Default to half the base radius if no radius specified
  //   var midX = width * 0.5;
  //   var midY = height * 0.5;

  //   // Save the current state
  //   waveformCtx.save();
  //   waveformCtx.globalCompositeOperation = 'source-over';
  //   waveformCtx.beginPath();
  //   waveformCtx.arc(midX, midY, centerRadius, 0, TAU, false);
  //   waveformCtx.fill();
  //   waveformCtx.restore();
  // };

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

    var x = Math.sin(angle);
    var y = Math.cos(angle);
    var midX = width * 0.5;
    var midY = height * 0.5;

    // First draw the main visualization with lighter composition
    dnaCtx.globalCompositeOperation = "lighter";

    // -- MAIN VISUALIZATION --
    // Draw the main visualization
    for (var a = 16; a < audioData.length; a++) {

      volume = audioData[a] / 255;

      if (volume < 0.75)
        continue;

      // Adjust color based on current pass
      color = (currentPass * 90) + passPosition * 90 + Math.random() * 24;
      color = Math.round(color % 360);

      lnDataDistance = (Math.log(a - 4) / LOG_MAX) - BASE;

      distance = lnDataDistance * outerRadius;

      // // Skip if the distance would draw over the waveform area
      // if (distance < WAVEFORM_RADIUS + 10)
      //   continue;

      size = volume * MAX_DOT_SIZE + Math.random() * 2;

      if (Math.random() > 0.995) {
        size *= (audioData[a] * 0.2) * Math.random();
        volume *= Math.random() * 0.25;
      }

      dnaCtx.globalAlpha = volume * 0.09;
      dnaCtx.fillStyle = 'hsl(' + color + ', 80%, 50%)';
      dnaCtx.beginPath();
      dnaCtx.arc(
        midX + x * distance,
        midY + y * distance,
        size, 0, TAU, false);
      dnaCtx.closePath();
      dnaCtx.fill();      
    }

    // // -- WAVEFORM VISUALIZATION --
    // // Now draw the center waveform with source-over composition
    // waveformCtx.globalCompositeOperation = "source-over";
    // //waveformCtx.globalAlpha = 1;
    // this.clearCenter(WAVEFORM_RADIUS + 5);
    
    // // Create gradient for the waveform
    // var gradient = waveformCtx.createLinearGradient(
    //   midX - WAVEFORM_RADIUS, midY - WAVEFORM_RADIUS,
    //   midX + WAVEFORM_RADIUS, midY + WAVEFORM_RADIUS
    // );
    // gradient.addColorStop(0, 'rgba(64, 128, 255, 1)');   // Blue
    // gradient.addColorStop(0.5, 'rgba(255, 64, 255, 1)'); // Purple
    // gradient.addColorStop(1, 'rgba(255, 64, 128, 1)');   // Pink

    // waveformCtx.lineWidth = 0.5;// WAVEFORM_WIDTH;
    // waveformCtx.strokeStyle = gradient;

    // // Start the path for the continuous waveform
    // waveformCtx.beginPath();

    // // We'll use 360 points plus 1 to close the circle smoothly
    // for (var i = 0; i <= 361; i++) {

    //   // Convert degree to radian and get the audio data index
    //   var angle = (i * TAU) / 180;
    //   var dataIndex = Math.floor((i * audioData.length) / 360);
      
    //   // Get amplitude from audio data (normalized and smoothed)
    //   var amplitude = 0;
    //   if (dataIndex < audioData.length) {
    //     // Average a few nearby values for smoothing
    //     var sum = 0;
    //     var count = 0;
    //     for (var j = -2; j <= 2; j++) {
    //       var idx = dataIndex + j;
    //       if (idx >= 0 && idx < audioData.length) {
    //         sum += audioData[idx];
    //         count++;
    //       }
    //     }
    //     amplitude = ((sum / count) / 255)*1.5;
    //     //amplitude *= 3;
    //   }
            
    //   // Calculate radius with some variation based on amplitude
    //   var radius = WAVEFORM_RADIUS + (amplitude * 4);
      
    //   // Convert to cartesian coordinates
    //   var x = midX + radius * Math.cos(angle);
    //   var y = midY + radius * Math.sin(angle);
      
    //   if (i === 0) {
    //     waveformCtx.moveTo(x, y);
    //   } else {
    //     waveformCtx.lineTo(x, y);
    //   }

    // }
    // waveformCtx.closePath();
    // waveformCtx.stroke();

    // // Draw over the inner waveform radius circle with black to let the actual waveform show up
    // waveformCtx.strokeStyle = 'rgb(0, 0, 0)';
    // waveformCtx.lineWidth = 2;
    // waveformCtx.beginPath();
    // waveformCtx.arc(midX, midY, WAVEFORM_RADIUS, 0, TAU);
    // waveformCtx.stroke();
    // waveformCtx.closePath();

  };

  window.addEventListener('resize', onResize, false);
  window.addEventListener('load', function() {
    onResize();
  }, false);
}
