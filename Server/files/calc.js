var fs = require('fs');
var inputUrl = 'input.txt';

IntervalStore = function() {
  this.segmentHash = {};
  this.nodes = [];
};

IntervalStore.prototype._readLines = function(input) {
  var remaining = '';
  var that = this;
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      var node = line.split(',');
      that.nodes.push(node);
      if (node[0] === '500000') {
        console.log('halfway there');
      }
      for (var i = parseFloat(node[1]); i < (parseFloat(node[1])+parseFloat(node[2])); i++) {
        if (that.segmentHash[i]) {
      	  if (parseFloat(that.segmentHash[i][3]) < parseFloat(node[3])) {
            that.segmentHash[i] = node;
          }
        } else {
      	  that.segmentHash[i] = node;
        }
      }
      remaining = remaining.substring(index + 1);
      index = remaining.indexOf('\n');
    }
  });
   input.on('end', function() {
    console.log('listening');
  });
};

IntervalStore.prototype.load = function(inputUrl) {
  var input = fs.createReadStream('./FileStore/' + inputUrl);
  this._readLines(input);
};

IntervalStore.prototype.add = function(node) {
  this.nodes.push(node);
  for (var i = parseFloat(node[1]); i < (parseFloat(node[1])+parseFloat(node[2])); i++) {
    if (this.segmentHash[i]) {
      if (parseFloat(this.segmentHash[i][3]) < parseFloat(node[3])) {
        this.segmentHash[i] = node;
      }
    } else {
      this.segmentHash[i] = node;
    }
  }
};

IntervalStore.prototype.find = function(id) {
  var clickedSegment = {}
  segmentHash = this.segmentHash[id];
  if (segmentHash) {
    clickedSegment.id = parseFloat(segmentHash[0]);
    clickedSegment.x = parseFloat(segmentHash[1]);
    clickedSegment.len = parseFloat(segmentHash[2]);
    clickedSegment.z = parseFloat(segmentHash[3]);
  }else {
    clickedSegment = {};
  }
  return clickedSegment;
};

interval = new IntervalStore();
interval.load(inputUrl);
exports.interval = interval;


