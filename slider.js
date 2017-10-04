$(document).ready(function() {

  var numOfClicks = 0;
  var intervalId;

  $("#slider").slider({
    min: 0,
    max: 10,
    value: 0,
    change: function(event, ui) {
      showValue(ui.value);
    },
    slide: function(event, ui) {}
  });

  $("#resetValueContainer button").on("click", function() {
    resetValue();
  });

  $("#slider").on("slidechange slide", function(event, ui) {
    showValue(ui.value);
  });

  $("#slider").on("slidestop", function(event, ui) {
    showValue(ui.value);
    var value = ui.value;
    var speed = translateValueToSpeed(value);
    speed === 0 ? stopAnimate() : startAnimate(speed);
  });

  function translateValueToSpeed(value) {
    if ((value < 10) && (value > 0)) {
      var valueAsStr = (10 - value) + '00';
      return Number(valueAsStr);
    } else if (value === 0) {
      stopAnimate();
      return 0;
    } else {
      return 50;
    }

  }

  function handAnimation(e) {
    numOfClicks++;
    var isEvevn = isEven(numOfClicks);
    animateThis(isEvevn);
    return isEvevn;
  }

  function isEven(n) {
    return n % 2 == 0;
  }

  function animateThis(isEvevn) {
    $("#hand").animate({
      opacity: "initial",
    }, {
      step: function(now, fx) {
        if (!isEvevn) {
          $("#hand").css('transform', 'rotate(35deg)');
        } else {
          $("#hand").css('transform', 'rotate(-35deg)');
        }
      }
    });
  }

  function getRange() {
    var minVal = $("#slider").slider("option", "min");
    var maxVal = $("#slider").slider("option", "max");
    $("#min span").html(minVal);
    $("#max span").html(maxVal);
  }

  function showValue(value) {
    $("#sliderValue").html(value);
  }

  function resetValue() {
    $("#slider").slider("value", 0);
    $("#sliderValue").html(0);
    stopAnimate();
  }

  function startAnimate(speed) {
    if (intervalId) {
      stopAnimate();
    }
    intervalId = setInterval(handAnimation, speed);
  }

  function stopAnimate() {
    clearInterval(intervalId);
    $("#hand").stop(true, true);
    $("#hand").css('transform', 'rotate(0deg)');
  }

  getRange();
  showValue(0);

});
