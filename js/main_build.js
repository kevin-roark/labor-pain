(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* export something */
module.exports = new Kutility;

/* constructor does nothing at this point */
function Kutility() {

}

/**
 * get a random object from the array arr
 *
 * @api public
 */

Kutility.prototype.choice = function(arr) {
    var i = Math.floor(Math.random() * arr.length);
    return arr[i];
}

/**
 * returns a random color as an 'rgb(x, y, z)' string
 *
 * @api public
 */
Kutility.prototype.randColor = function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

Kutility.prototype.randInt = function(max, min) {
  if (min)
    return Math.floor(Math.random() * (max - min)) + min;
  else
    return Math.floor(Math.random() * (max));
}

/**
 * Color wheel 1 -> 1536.
 *
 * Written by Henry Van Dusen, all attribution to the big boy.
 * Slightly modified by Kev.
 *
 * @api public
 */
 Kutility.prototype.colorWheel = function(num) {
    var text = "rgb(";
    var entry = num % 1536;
    var num = entry % 256;

    if(entry < 256 * 1)
    	return text + "0,255," + num + ")";
    else if(entry < 256 * 2)
    	return text + "0," + (255 - num) + ",255)";
    else if(entry < 256 * 3)
      return text + num + ",0,255)";
    else if(entry < 256 * 4)
      return text + "255,0," + (255 - num) + ")";
    else if(entry < 256 * 5)
      return text + "255," + num + ",0)";
    else
      return text + (255 - num) + ",255,0)";
 }

 /**
  * Make an rbg() color string an rgba() color string
  *
  * @api public
  */
Kutility.prototype.alphize = function(color, alpha) {
  color.replace('rgb', 'rgba');
  color.replace(')', ', ' + alpha + ')');
  return color;
}

/**
 * Get an array of two random contrasting colors.
 *
 * @api public
 */
Kutility.prototype.contrasters = function() {
  var num = Math.floor(Math.random() * 1536);
  var fg = this.colorWheel(num);
  var bg = this.colorWheel(num + 650);
  return [fg, bg];
}

/**
 * Add a random shadow to a jquery element
 *
 * @api public
 */
Kutility.prototype.addShadow = function(el, size) {
  var s = size + 'px';
  var shadow = '0px 0px ' + s + ' ' + s + ' ' + this.randColor();
  el.css('-webkit-box-shadow', shadow);
  el.css('-moz-box-shadow', shadow);
  el.css('box-shadow', shadow);
}

/**
 * Add transform to element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.addTransform = function(el, transform) {
  var curTransform = this.getTransform(el);
  curTransform = curTransform.replace('none', '');
  var newTransform = curTransform + transform;
  this.setTransform(el, newTransform);
}

/**
 * Set transform of element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.setTransform = function(el, transform) {
  el.css('-webkit-transform', transform);
  el.css('-moz-transform', transform);
  el.css('-ms-transform', transform);
  el.css('-o-transform', transform);
  el.css('transform', transform);
}

/**
 * Check an elements tansform.
 *
 * @api public
 */
Kutility.prototype.getTransform = function(el) {
  var possible = ['transform', '-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform'];

  for (var i = 0; i < possible.length; i++) {
    var f = el.css(possible[i]);
    if (f == 'none' && i + 1 < possible.length) {
      var pf = el.css(possible[i + 1]);
      if (pf)
        continue;
    }
    return f;
  }
}

/**
 * Remove all transforms from element.
 *
 * @api public
 */
Kutility.prototype.clearTransforms = function(el) {
  el.css('-webkit-transform', '');
  el.css('-moz-transform', '');
  el.css('-ms-transform', '');
  el.css('-o-transform', '');
  el.css('transform', '');
}

/**
 * Rotate an element by x degrees.
 *
 * @api public
 */
Kutility.prototype.rotate = function(el, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' rotate(' + x + 'deg)';
  this.setTransform(el, ct  + t);
}

/**
 * Scale an element by x (no units);
 *
 * @api public
 */
Kutility.prototype.scale = function(el, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/scale\(.*?\)/, '').replace('none', '');

  var t = ' scale(' + x + ')';
  this.setTransform(el, ct + t);
}

/**
 * Translate an element by x, y (include your own units);
 *
 * @api public
 */
Kutility.prototype.translate = function(el, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/translate\(.*?\)/, '').replace('none', '');

  var t = ' translate(' + x + ', '  + y + ')';
  this.setTransform(el, ct + t);
}

/**
 * Skew an element by x, y degrees;
 *
 * @api public
 */
Kutility.prototype.skew = function(el, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/skew\(.*?\)/, '').replace('none', '');

  var xd = x + 'deg';
  var yd = y + 'deg';
  var t = ' skew(' + xd + ', ' + yd + ')';
  this.setTransform(el, ct + t);
}

/**
 * Warp an element by a random amount by rotating and skewing it.
 *
 * @api public
 */
Kutility.prototype.warp = function(el) {
  var r = Math.floor(Math.random() * 360);
  var x = Math.floor(Math.random() * 360);
  var y = Math.floor(Math.random() * 360);

  this.rotate(el, r);
  this.skew(el, x, y);
}

/**
 * Add filter to element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.addFilter = function(el, filter) {
  var curFilter = this.getFilter(el);
  curFilter = curFilter.replace('none', '');
  var newFilter = curFilter + ' ' + filter;
  this.setFilter(el, newFilter);
}

/**
 * Set filter to element with all lame prefixes.
 *
 * @api public
 */
Kutility.prototype.setFilter = function(el, filter) {
  el.css('-webkit-filter', filter);
  el.css('-moz-filter', filter);
  el.css('-ms-filter', filter);
  el.css('-o-filter', filter);
  el.css('filter', filter);
}

/**
 * Check an elements filter.
 *
 * @api public
 */
Kutility.prototype.getFilter = function(el) {
  var possible = ['filter', '-webkit-filter', '-moz-filter', '-ms-filter', '-o-filter'];

  for (var i = 0; i < possible.length; i++) {
    var f = el.css(possible[i]);
    if (f == 'none' && i + 1 < possible.length) {
      var pf = el.css(possible[i + 1]);
      if (pf)
        continue;
    }
    return f;
  }
}

/**
 * Remove all filters from element.
 *
 * @api public
 */
Kutility.prototype.clearFilters = function(el) {
  el.css('-webkit-filter', '');
  el.css('-moz-filter', '');
  el.css('-ms-filter', '');
  el.css('-o-filter', '');
  el.css('filter', '');
}

/**

/**
 * Grayscale an element by x percent.
 *
 * @api public
 */
Kutility.prototype.grayscale = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/grayscale\(.*?\)/, '').replace('none', '');

  var f = ' grayscale(' + x + '%)';
  this.setFilter(el, cf  + f);
}

/**
 * Sepia an element by x percent.
 *
 * @api public
 */
Kutility.prototype.sepia = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/sepia\(.*?\)/, '').replace('none', '');

  var f = ' sepia(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Saturate an element by x percent.
 *
 * @api public
 */
Kutility.prototype.saturate = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/saturate\(.*?\)/, '').replace('none', '');

  var f = ' saturate(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Invert an element by x percent.
 *
 * @api public
 */
Kutility.prototype.invert = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/invert\(.*?\)/, '').replace('none', '');

  var f = ' invert(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Hue-rotate an element by x degrees.
 *
 * @api public
 */
Kutility.prototype.hutate = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/hue-rotate\(.*?\)/, '').replace('none', '');

  var f = ' hue-rotate(' + x + 'deg)';
  this.setFilter(el, cf + f);
}

/**
 * Set opacity of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.opace = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/opacity\(.*?\)/, '').replace('none', '');

  var f = ' opacity(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Set brightness of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.brightness = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/brightness\(.*?\)/, '').replace('none', '');

  var f = ' brightness(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Set contrast of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.contrast = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/contrast\(.*?\)/, '').replace('none', '');

  var f = ' contrast(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Blur an element by x pixels.
 *
 * @api public
 */
Kutility.prototype.blur = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/blur\(.*?\)/, '').replace('none', '');

  var f = ' blur(' + x + 'px)';
  this.setFilter(el, cf + f);
}

},{}],2:[function(require,module,exports){
$(function() {

  var kt = require('./lib/kutility'); /* you can remove this if you don't want it */

  var video = document.querySelector('#video');
  var $vid = $(video);

  var $img = $('<img class="labor-pain-image">');
  $img.attr('src', 'media/fb_pains.png');
  var img = $img.get(0);

  var WALK_IN = 18000;
  var START_JULIE = 21500;
  var END_JULIE = 24500;
  var C1S = 30000; // contract 1 start
  var THAT_SOUNDS_FUN = 40000;
  var C1E = 41000; // contract 1 end
  var C2S = 67000;
  var C2E = 77000;
  var PAIN1S = 100000;
  var PAIN1E = 118500;
  var PAIN2S = 137000;
  var PAIN2E = 146000;
  var PAIN3S = 155000;
  var PAIN3E = 173500;

  var MAX_BRIGHT = 666;

  video.addEventListener("canplaythrough", function() {

    video.play();
    setTimeout(hideFooter, 500);
    setTimeout(step1, 15000);
    setTimeout(step2, 35000);
    setTimeout(step3, 50000);
    setTimeout(step4, C2S - 1500);
    setTimeout(step5, PAIN1S + 1500);
    setTimeout(soundsFun, THAT_SOUNDS_FUN);
    setTimeout(julieMasters, START_JULIE);
    setTimeout(owies, PAIN1S + 2000);

    soundControl();
    speedControl();

    setInterval(function() {
      $('.debug-timer').html(video.currentTime);
    }, 200);
  });

  function hideFooter() {
    $('.footer').animate({
      opacity: 0.0
    }, 800);

    $('.footer').mouseenter(function() {
      $(this).animate({
        opacity: 1.0
      }, 400);
    });

    $('.footer').mouseleave(function() {
      $(this).animate({
        opacity: 0.0
      }, 400);
    });
  }

  function soundControl() {
    function toggle() {
      video.muted = !video.muted;
    }

    function vol(num) {
      video.volume = num;
    }

    var toggleTimes = [
      WALK_IN, START_JULIE, END_JULIE,
      C1S, C1E, C2S, C2E,
      PAIN1S, PAIN1E, PAIN2S, PAIN2E, PAIN3S, PAIN3E
    ];

    setInterval(function() {
      var t = toggleTimes[0];
      var c = video.currentTime * 1000;
      var diff = Math.abs(c - t);
      if (diff < 100) { // a toggle time
        toggle();
        toggleTimes.shift(); // remove this time
        if (t == C1E) { // cut volume here
          vol(0.5);
        } else if (t == C2E) { // and more here
          vol(0.3);
        }
      }
    }, 150);

  }

  function speedControl() {
    function speed(rate) {
      video.playbackRate = rate;
    }

    var speedTimes = [
      PAIN1S, PAIN1E, PAIN2S, PAIN2E, PAIN3S, PAIN3E
    ];

    setInterval(function() {
      var t = speedTimes[0];
      var c = video.currentTime * 1000;
      var diff = Math.abs(c - t);
      if (diff < 100) { // a speed time
        setSpeed(t);
        speedTimes.shift(); // remove this one
      }
    }, 150);

    function setSpeed(time) {
      switch (time) {
        case PAIN1S:
          speed(0.7); break;
        case PAIN1E:
          speed(1.0); break;
        case PAIN2S:
          speed(0.5); break;
        case PAIN2E:
          speed(1.0); break;
        case PAIN3S:
          speed(0.2); break;
        case PAIN3E:
          speed(1.0); break;
        default:
          break;
      }
    }
  }

  function step1() {

    function brightnessShift() {
      kt.clearFilters($vid);
      var b = kt.randInt(MAX_BRIGHT, 15);
      kt.brightness($vid, b);

      var next = kt.randInt(250, 50);
      setTimeout(brightnessShift, next);
    }

    brightnessShift();
  }

  function step4() {
    var maxcon = 300;
    var maxsat = 300;

    function colorShift() {
      var con = kt.randInt(maxcon, 60);
      var hue = kt.randInt(360);
      var sat = kt.randInt(maxsat, 60);
      var inv = kt.randInt(101);

      kt.contrast($vid, con);
      kt.hutate($vid, hue);
      kt.saturate($vid, sat);
      kt.invert($vid, inv);

      var next = kt.randInt(350, 60);
      setTimeout(colorShift, next);
    }

    MAX_BRIGHT = 400;
    colorShift();
  }

  function step5() {
    function transform() {
      var scale = kt.randInt(6, 1);
      var deg = kt.randInt(360);
      var xs = kt.randInt(60) - 30; // -30 -> 30
      var ys = kt.randInt(60) - 30; // -30 -> 30

      kt.scale($vid, scale);
      kt.rotate($vid, deg);
      kt.skew($vid, xs, ys);

      console.log('transforming');

      var clear = kt.randInt(1500, 500);
      setTimeout(clearTransforms, clear);
    }

    function clearTransforms() {
      kt.scale($vid, 1);
      kt.rotate($vid, 0);
      kt.skew($vid, 0, 0);

      var next = kt.randInt(6000, 3000);
      setTimeout(transform, next);
    }

    transform();
  }

  function step2() {

    function getAngeliqueGoing() {
      $img.css('width', aWidth + 'px');
      $img.css('height', aHeight + 'px');
      $img.css('left', aX);
      $img.css('top', aY);

      if (growing) {
        aWidth += 3;
        aHeight += 2;
        if (aWidth >= 500)
          growing = false;
      } else {
        aWidth -= 3;
        aHeight -= 2;
        if (aWidth <= -200)
          growing = true;
      }

      if (movement == 'r') {
        aX += kt.randInt(10);
        if (aX > 666)
          movement = 'd';
      } else if (movement == 'd') {
        aY += kt.randInt(10);
        if (aY > 666)
          movement = 'l';
      } else if (movement == 'l') {
        aX -= kt.randInt(10);
        if (aX < -200)
          movement = 'u';
      } else {
        aY -= kt.randInt(10);
        if (aY < -200)
          movement = 'r';
      }

      setTimeout(getAngeliqueGoing, 30);
    }

    $('body').append($img);
    var aWidth = 300;
    var aHeight = 200;
    var growing = true;
    var movement = 'l';
    var aX = 20;
    var aY = 20;
    getAngeliqueGoing();

  }

  function step3() {

    var numComments = 7;

    function flashAComment() {
      var commentName = 'media/com' + kt.randInt(numComments + 1, 1) + '.png';
      var c = $('<img class="labor-comment">');
      c.attr('src', commentName);

      var top = kt.randInt(666);
      var left = kt.randInt(666);
      c.css('top', top + 'px');
      c.css('left', left + 'px');
      $img.css('width', '300px');
      $img.css('height', '300px');
      $('body').append(c);

      removeLater(c);
      setTimeout(flashAComment, kt.randInt(10000, 2000));
    }

    flashAComment();
  }

  function removeLater(el) {
    setTimeout(function() {
      el.remove();
    }, kt.randInt(6666, 2666));
  }

  function soundsFun() {
    var text = "THAT SOUNDS FUN";
    var div = $('<div class="fun-text">');
    div.html(text);
    $('body').append(div);

    var flashTimer = setInterval(function() {
      var c = kt.randInt(1536);
      div.css('color', kt.colorWheel(c));
    }, 300);

    setTimeout(function() {
      clearInterval(flashTimer);
      div.remove();
    }, 2000);
  }

  function julieMasters() {
    var text = "DR.<br>JULIE<br>MASTERS";
    var div = $('<div class="julie-text">');
    div.html(text);
    $('body').append(div);

    setTimeout(function() {
      div.remove();
    }, 1800);
  }

  function owies() {
    function showOw() {
      var text = "OW";
      var div = $('<div class="ow-text">');
      div.html(text);
      $('body').append(div);

      removeLater(div);
    }

    showOw();
    setTimeout(showOw, 10000);
    setTimeout(showOw, 35000);
    setTimeout(showOw, 55000);
  }

});

},{"./lib/kutility":1}]},{},[2])