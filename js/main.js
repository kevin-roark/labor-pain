$(function() {

  var kutility = require('./lib/kutility'); /* you can remove this if you don't want it */

  var video = document.querySelector('#video');
  var $vid = $(video);

  var $img = $('<img class="labor-pain-image">');
  $img.attr('src', 'media/fb_pains.png');
  var img = $img.get(0);

  var start = Date.now();

  var THAT_SOUNDS_FUN = 40000;

  setTimeout(step1, 5000);
  setTimeout(step2, 25000);
  setTimeout(step3, 35000);
  setTimeout(step4, THAT_SOUNDS_FUN);

  function step1() {

    function brightnessShift() {
      var b = kutility.randInt(666, 15);
      kutility.brightness($vid, b);

      var next = kutility.randInt(250, 50);
      setTimeout(brightnessShift, next);
    }

    brightnessShift();
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
        if (aWidth >= 800)
          growing = false;
      } else {
        aWidth -= 3;
        aHeight -= 2;
        if (aWidth <= -200)
          growing = true;
      }

      if (movement == 'r') {
        aX += kutility.randInt(10);
        if (aX > 666)
          movement = 'd';
      } else if (movement == 'd') {
        aY += kutility.randInt(10);
        if (aY > 666)
          movement = 'l';
      } else if (movement == 'l') {
        aX -= kutility.randInt(10);
        if (aX < -100)
          movement = 'u';
      } else {
        aY -= kutility.randInt(10);
        if (aY < -100)
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
      var commentName = 'media/com' + kutility.randInt(numComments + 1, 1) + '.png';
      var c = $('<img class="labor-comment">');
      c.attr('src', commentName);

      var top = kutility.randInt(666);
      var left = kutility.randInt(666);
      c.css('top', top + 'px');
      c.css('left', left + 'px');
      $img.css('width', '300px');
      $img.css('height', '300px');
      $('body').append(c);

      removeLater(c);
      setTimeout(flashAComment, kutility.randInt(10000, 2000));
    }

    function removeLater(el) {
      setTimeout(function() {
        el.remove();
      }, kutility.randInt(6666, 2666));
    }

    flashAComment();

  }

  function step4() {
    var text = "THAT SOUNDS FUN";
    var div = $('<div class="fun-text">');
    div.html(text);
    $('body').append(div);

    var flashTimer = setInterval(function() {
      var c = kutility.randInt(1536);
      div.css('color', kutility.colorWheel(c));
    }, 200);

    setTimeout(function() {
      clearInterval(flashTimer);
      div.remove();
    }, 5000);

  }

});
