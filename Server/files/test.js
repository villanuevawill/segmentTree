var fs = require('fs');

var testAnswers = [];
function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      testAnswers.push(line);
      remaining = remaining.substring(index + 1);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      testAnswers.push(remaining);
    }
  });
}

var input = fs.createReadStream('./FileStore/output.txt');
readLines(input);
exports.testAnswers = function(){
  return testAnswers;
}



