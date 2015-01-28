$(document).on('ready', function() {

	  var $outer = $('<div>')
  		.addClass('outer-clock');

  	var $inner = $('<div>')
  		.addClass('inner-clock');

  	var $pmDot = $('<div>')
  		.addClass('dots pmDot hiding');

  	var $pm = $('<p>')
  		.text('PM')
  		.append($pmDot)
   		.addClass('pm');

   	var $autoDot = $('<div>')
 		  .addClass('dots autoDot');

  	var $auto = $('<p>')
  		.text('AUTO')
  		.append($autoDot);

  	var $indicators = $('<div>')
  		.append($pm).append($auto)
  		.addClass('indicators');

  	var $clockScreen = $('<div>')
  		.addClass('screen');
  		
    // AM/FM BAND ROWS

  	var amLabels = ['53', '60', '70', '90', '110', '140', '170'];
  	var fmLabels = ['88', '92', '96', '102', '106', '108'];

  	var labelMaker = function(labelArray) {
  		return labelArray.map(function(label) {
  			return $("<span class='freqs'> " + label + " </span>");
  		});
  	};

  	var $amFreq = labelMaker(amLabels);
  	var $fmFreq = labelMaker(fmLabels);

    var makeRows = function(labels, band) {
      return $('<div>')
        .addClass('radioRows')
        .append("<span class='band'>" + band + "</span>")
        .append(labels);
    };

    var $amRow = makeRows($amFreq, 'AM').append("<span><span class='little'>X10</span> Khz</span>");
    var $fmRow = makeRows($fmFreq, 'FM').append("<span class='Hz''>Mhz</span>");

  	// CLOCK FUNCTIONS

    var addZero = function(time) {
      if(time < 10) {time = "0" + time};
      return time;
    };

    var amPM = function(am, pm) {
      pm = am;
      if(am >= 12) {pm = am - 12}
      if(pm === 0) {pm = 12}
      return pm;
    };

    var addPM = function(hr, name) {
      if(hr >= 12) {name.removeClass('hiding')}
      if(hr < 12) {name.addClass('hiding')}
    };

    var $hours = $("<span>");
    var $minutes = $("<span class='mins'>");
    var $theTime = $('<div>')
      .addClass('mainTime');

    // COLON DEFINITIONS

    var $colon = $("<p class='colon'></p><p class='colon colon2'></p>");

    setInterval(function() {
      $colon.toggleClass('hiding');
    }, 1000);

    // TICK FUNCTION

    var tick = function(){

        var now = new Date();
        var min = addZero(now.getMinutes());
        var hr = now.getHours();
        hrPM = addZero(amPM(hr));

        // PM dot

        addPM(hr, $pmDot);

        // TOTAL TIME

        $hours.text(hrPM);
        $minutes.text(min);
        $theTime.append($hours).append($colon).append($minutes);
        $clockScreen.html($theTime);

    };

    tick();

    setInterval(tick, 1000);

  	// PUTTING IT TOGETHER
  	
  	$('.clock').append($outer).append($inner);
  	$inner.append($indicators);
  	$inner.append($clockScreen);
  	$inner.append($amRow).append($fmRow);
 	
});