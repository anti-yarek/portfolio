$("input.slider").on("input change", function(event) {
    var element = $(this).parents("div.slide-container");
    var pos = event.target.value;
  
    element.find("div.before").css({width: pos + "%"});
    element.find("div.after").css({width: (100 - pos) + "%"}); // Adjust width of after image
  
    element.find("div.slider-button").css({left: "calc(" + pos + "% - 2.4vw)"});
  });