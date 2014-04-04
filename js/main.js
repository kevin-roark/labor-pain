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
