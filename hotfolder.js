var fs = require('fs');
var xml2js = require('xml2js');
var glob = require('glob');
var path = require('path');

var parser = new xml2js.Parser();

module.exports.startHotfolder = function(){
  console.log('Hotfolder running');
  scanHotfolder();
};

function scanHotfolder(){
  var getDirectories = function (src, callback) {
    glob(src + '/**/*', callback);
  };
  getDirectories('/Users/jakobmannjensen/Documents/NodeJS/hotfolder', function (err, res) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(res);
    }
    console.log('length: '+res.length);
    for(var f in res)
    {
      if(res[f].includes('.xml'))
      {
        console.log('TestNew '+res[f]);
        processXML(res[f]);
      }
    }
  });

  function processXML(xmlfile)
  {
    console.log('Start processXML');
    var bname = path.basename(xmlfile);
    var workfilename = '/Users/jakobmannjensen/Documents/NodeJS/workfolder/'+bname;
    fs.renameSync(xmlfile, workfilename, (err) => {
      if (err) throw err;
      console.log('Rename complete!');
    });


    fs.readFile(workfilename, function(err,data){
      parser.parseString(data, function(err, result){
        //console.dir(result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['ENDEDASYNC']);
        console.dir(result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']);
          //res.render('parse',{data: result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']});
      });
    });

  }
}
