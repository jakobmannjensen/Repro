var fs = require('fs');
var glob = require('glob');

module.exports.startHotfolder = function(){
  console.log('Hotfolder running');
  scanHotfolder();
};

function scanHotfolder(){
  var getDirectories = function (src, callback) {
    glob(src + '/**/*', callback);
  };
  getDirectories('/Users/jakobmannjensen/Documents/NodeJS', function (err, res) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(res);
    }
    console.log('length: '+res.length);
    for(var f in res)
    {
      if(res[f].includes('.json'))
      {
        console.log('TestNew '+res[f]);
      }
    }
  });
}
