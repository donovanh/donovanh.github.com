function buildWeightChart(sourceData, targetContainer, colourRange, sort) {
  if (sort === 'ascending') {
    sourceData = sortSourceData(sourceData);
  } else if (sort === 'descending') {
    sourceData = sortSourceData(sourceData).reverse();
  }
  var totalScore = sourceData.reduce(function(prev, person) {
    return prev + person.score;
  }, 0);
  // Generate the colours for the backgrounds
  var colours = generateColours(sourceData.length, colourRange);
  var totalWidth = 0; // Track how wide the bar gets
  $(sourceData).each(function(index, person) {
    var segmentDiv = generateSegment(person.score, totalScore, colours[index]);
    totalWidth += parseFloat($(segmentDiv).data('width'));
    var delay = .2 + (.1 * (index));
    var scoreSpan = '<span class="weightChart-score" style="'+insertDelay(delay)+'">' + person.score + '</span>';
    $(scoreSpan).css('animation-delay', delay + 's');
    var image = '<img class="weightChart-image" style="'+insertDelay(delay)+'" src="' + person.image + '" alt="' + person.name + '">';
    $(image).css('animation-delay', delay + 's');
    segmentDiv.append(scoreSpan + image);
    $(targetContainer).append(segmentDiv);
  });
  if (totalWidth > 100) {
    // It's too wide - remove the overage from the larger items
    var overagePerItem = -(99.9 - totalWidth) / sourceData.length;
    $(targetContainer).find('.weightChart-segment').each(function(index, segment) {
      var segmentWidth = $(segment).attr('data-width');
      $(segment).css('width', segmentWidth - overagePerItem + '%');
    });
  }
}
function sortSourceData(sourceData) {
  return sourceData.sort(function(obj1, obj2) {
    // Ascending: first age less than the previous
    return obj1.score - obj2.score;
  });
}
function insertDelay(delay) {
  return '-webkit-animation-delay: ' + delay + 's; animation-delay: ' + delay + 's';
}
function generateSegment(score, total, colour) {
  var segmentDiv = $('<div></div>');
  var width = (score / total) * 100;
  if (width < 8) width = 8;
  segmentDiv.addClass('weightChart-segment');
  segmentDiv.css({
    'background-color': colour,
    width: width + '%'
  });
  segmentDiv.attr('data-width', width);
  return segmentDiv;
}
function generateColours(number, colourRange) {
  // The beginning of your gradient
  var start = convertToRGB(colourRange[0]);
  // The end of your gradient
  var end   = convertToRGB(colourRange[1]);
  //Alpha blending amount
  var alpha = 0.0;
  var colours = [];
  for (i = 0; i < number; i++) {
    var c = [];
    alpha += (1.0/number);
    c[0] = start[0] * alpha + (1 - alpha) * end[0];
    c[1] = start[1] * alpha + (1 - alpha) * end[1];
    c[2] = start[2] * alpha + (1 - alpha) * end[2];
    colours.push(convertToHex (c));
  }
  return colours;
}

function hex (c) {
  var s = "0123456789abcdef";
  var i = parseInt (c);
  if (i == 0 || isNaN (c))
    return "00";
  i = Math.round (Math.min (Math.max (0, i), 255));
  return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex (rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

/* Convert a hex string to an RGB triplet */
function convertToRGB (hex) {
  var color = [];
  color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
  color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
  color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
  return color;
}
