$(document).ready(function() {
  $("#slider").slider({
    min: 0,
    max: 50,
    value: 0
  });

  $("#resetValueContainer button").on("click", function() {
    resetValue();
  });

  $("#slider>span").on("mousedown mouseup", function(event) {
    event.preventDefault();
    $("#slider>span, body").on("mousemove", function(e) {
      showValue();
    });
    $("#slider>span, body").on("mouseup", function(e) {
      showValue();
      $("#slider>span, body").unbind("mousemove mouseup");
    });
  });

  function getRange() {
    var minVal = $("#slider").slider("option", "min");
    var maxVal = $("#slider").slider("option", "max");
    $("#min span").html(minVal);
    $("#max span").html(maxVal);
  }

  function showValue() {
    var value = $("#slider").slider("value");
    $("#sliderValue").html(value);
  }

  function resetValue() {
    $("#slider").slider("value", 0);
    $("#sliderValue").html(0);
  }

  getRange();
  showValue();

});
