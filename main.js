$(document).on('ready', function() {

    // COMPONENTS

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

    // AUTO BUTTON

    var $button = $('<div>')
      .addClass('button');

    $(document).on('click', '.button', function(e){
        e.stopPropagation();
        $button.animate({height: '5px', top: '-5px'}, 100);
        $autoDot.toggleClass('hiding');
        $button.animate({height: '20px', top: '-20px'}, 100);
    });
  		
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
        .append("<span class='band " + band + "Ind'>" + band + "</span>")
        .append(labels);
    };

    var $amRow = makeRows($amFreq, 'AM').append("<span><span class='little'>X10</span> Khz</span>");
    var $fmRow = makeRows($fmFreq, 'FM').append("<span class='Hz''>Mhz</span>");

    // SLIDER STATION SELECTOR

    var $slider = $("<input type='range'>");
    $(document).on('click', "input[type='range']", function(e){
      e.stopPropagation();
    });

    // AM/FM SELECTOR

    var $amFMSelector = $('<div>')
        .addClass('amFMSelector');
    var $amFMLetters = $('<div>')
        .text('AM     FM')
        .addClass('amFMLetters');

    $amRow.addClass('selected');
    $amFMSelector.click(function() {
      $amFMSelector.toggleClass('amFMSelector1');
      $amRow.toggleClass('selected');
      $fmRow.toggleClass('selected');
    });

  	// CLOCK FUNCTIONS

    var addZero = function(time) {
      if(time < 10) {time = "0" + time}
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

    // 24HR TIME
    
    var $24hr = $('<div>')
      .text('STD     24hr')
      .addClass('Letters');
    var $24hrButton = $('<div>')
      .addClass('Button');

    $24hrButton.click(function(e) {
      $24hrButton.toggleClass('moveButton');
      e.stopPropagation();
    });

    // TICK FUNCTION

    var tick = function(){

        var now = new Date();
        var min = addZero(now.getMinutes());
        var hr = now.getHours();
        var hrPM = hr;

        
        if($24hrButton.hasClass('moveButton')) {
          hrPM = amPM(hr);
        }
        else {
          hrPM = hrPM;
        }

        hrPM = addZero(hrPM);

        // PM dot

        addPM(hr, $pmDot);

        // TOTAL TIME

        $hours.text(hrPM);
        $minutes.text(min);
        $theTime.append($hours).append($colon).append($minutes);
        $clockScreen.html($theTime);

    };

    tick();
    setInterval(tick, 100);

  	// PUTTING IT TOGETHER
  	
  	$('.clock').append($outer).append($inner);
    $outer.append($button)
      .append($amFMSelector)
      .append($24hr)
      .append($amFMLetters)
      .append($24hrButton);
  	$inner.append($indicators)
  	  .append($clockScreen)
  	  .append($amRow)
      .append($fmRow)
      .append($slider);
 	
});