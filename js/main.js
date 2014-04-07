$(function() {

  var kt = require('./lib/kutility'); /* you can remove this if you don't want it */

  var video = document.querySelector('#video');
  var $vid = $(video);
  var vidReady = false;

  var audio = document.querySelector('#audio');
  var $aud = $(audio);
  var audReady = false;

  var $img = $('<img class="labor-pain-image">');
  $img.attr('src', 'media/fb_pains.png');
  var img = $img.get(0);

  var activeBrightness, activeColor, activeWarp, activeAngelique, activeComments;

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
  var ENDVISTIME = 285000;
  var AUDIO_LENGTH = 364000;
  var MAX_BRIGHT = 666;

  video.addEventListener("canplaythrough", function() {
    vidReady = true;
    if (audReady)
      start();
  });

  audio.addEventListener("canplaythrough", function() {
    audReady = true;
    if (vidReady)
      start();
  });

  function start() {
    audio.play();
    video.play();

    setTimeout(hideFooter, 1000);
    setTimeout(step1, 17000);
    setTimeout(step2, 35000);
    setTimeout(step3, 53000);
    setTimeout(step4, C2S - 1500);
    setTimeout(step5, PAIN1S + 1500);
    setTimeout(soundsFun, THAT_SOUNDS_FUN);
    setTimeout(julieMasters, START_JULIE);
    setTimeout(owies, PAIN1S + 2000);
    setTimeout(cutTheCrap, ENDVISTIME);
    setTimeout(endgame, AUDIO_LENGTH);

    soundControl();
    speedControl();

    setInterval(function() {
      $('.debug-timer').html(video.currentTime + ' | ' + audio.currentTime);
    }, 200);
  }

  function cutTheCrap() {
    activeComments = false;
  }

  function endgame() {

    function restart() {
      activeBrightness = false;
      activeColor = false;
      activeWarp = false;
      kt.brightness($vid, 100);
      kt.contrast($vid, 100);
      kt.saturate($vid, 100);
      kt.invert($vid, 0);
      kt.clearTransforms($vid);
      kt.clearFilters($vid);
      MAX_BRIGHT = 666;

      audio.currentTime = 0;
      video.currentTime = 0;
      start();
    }

    function showFooter() {
      $('.footer').animate({
        opacity: 1.0
      }, 600);

      $('.footer').unbind('mouseenter');
      $('.footer').unbind('mouseleave');
    }

    showFooter();
    activeAngelique = false;
    setTimeout(restart, 5000);
  }

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

    video.muted = true;
  }

  function speedControl() {
    function speed(rate) {
      video.playbackRate = rate;
    }

    var speedTimes = [
      PAIN1S, PAIN1E, PAIN2S, PAIN2E, PAIN3S, PAIN3E
    ];

    var timer = setInterval(function() {
      var t = speedTimes[0];
      var c = video.currentTime * 1000;
      var diff = c - t;
      if (diff >= 100) { // a speed time
        setSpeed(t);
        speedTimes.shift(); // remove this one
        if (speedTimes.length == 0) {
          clearInterval(timer);
        }
      }
    }, 100);

    function setSpeed(time) {
      switch (time) {
        case PAIN1S:
          speed(0.6); break;
        case PAIN1E:
          speed(1.0); break;
        case PAIN2S:
          speed(0.5); break;
        case PAIN2E:
          speed(1.0); break;
        case PAIN3S:
          speed(0.2); break;
        case PAIN3E:
          speed(0.9); break;
        default:
          break;
      }
    }
  }

  function step1() {

    function brightnessShift() {
      kt.clearFilters($vid);
      var b = kt.randInt(MAX_BRIGHT, 5);
      kt.brightness($vid, b);

      var next = kt.randInt(250, 50);
      if (activeBrightness)
        setTimeout(brightnessShift, next);
    }

    activeBrightness = true;
    brightnessShift();
  }

  function step4() {
    var maxcon = 300;
    var maxsat = 300;

    function colorShift() {
      kt.clearFilters($vid);
      var con = kt.randInt(maxcon, 60);
      var hue = kt.randInt(360);
      var sat = kt.randInt(maxsat, 60);
      var inv = kt.randInt(100);

      kt.contrast($vid, con);
      kt.hutate($vid, hue);
      kt.saturate($vid, sat);
      kt.invert($vid, inv);

      var next = kt.randInt(350, 60);
      if (activeColor)
        setTimeout(colorShift, next);
    }

    MAX_BRIGHT = 400;
    activeColor = true;
    colorShift();
  }

  function step5() {
    function transform() {
      var deg = kt.randInt(360);
      var xs = kt.randInt(60) - 30; // -30 -> 30
      var ys = kt.randInt(60) - 30; // -30 -> 30

      kt.warp($vid, deg, xs, ys);

      var clear = kt.randInt(1300, 500);
      setTimeout(clearTransforms, clear);
    }

    function clearTransforms() {
      kt.warp($vid, 0, 0, 0);

      var next = kt.randInt(4000, 1000);
      if (activeWarp)
        setTimeout(transform, next);
    }

    activeWarp = true;
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

      if (activeAngelique)
        setTimeout(getAngeliqueGoing, 30);
      else {
        $img.css('width', '0px');
      }
    }

    $('body').append($img);
    var aWidth = 300;
    var aHeight = 200;
    var growing = true;
    var movement = 'l';
    var aX = 20;
    var aY = 20;
    activeAngelique = true;
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
      if (activeComments)
        setTimeout(flashAComment, kt.randInt(10000, 2000));
    }

    activeComments = true;
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
    setTimeout(showOw, 15000);
    setTimeout(showOw, 51000);
  }

});
