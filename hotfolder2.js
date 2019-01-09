var fs = require('fs');
var xml2js = require('xml2js');
var glob = require('glob');
var path = require('path');
var parser = new xml2js.Parser();
var settingsFile = './Settings/configuration.xml';
var scanfolder = '';
var workfolder = '';

module.exports.startHotfolder = function(){
  fs.readFileSync(settingsFile, function(err,data){
    if(err)
    {
      console.log("ERROR");
    }
    parser.parseString(data, function(err, result){
      console.dir('hotfolder003: '+result['hotfolder']);
      console.log('hotfolder004: Result from settings xml: '+result);
    });
  });
  scanHotfolder();
};

function scanHotfolder(){
  console.log('hotfolder006: scanfolder function');
  var getDirectories = function (src, callback) {
    glob(src + '/**/*', callback);
  };
  getDirectories('/Users/jakobmannjensen/Documents/NodeJS/hotfolder', function (err, res) {
    if (err) {
      console.log('Error', err);
    }
    for(var f in res)
    {
      if(res[f].includes('.xml'))
      {
        processXML(res[f]);
      }
    }
    setTimeout(scanHotfolder, 10000);
  });

  function processXML(xmlfile)
  {
    var bname = path.basename(xmlfile);
    var workfilename = '/Users/jakobmannjensen/Documents/NodeJS/workfolder/'+bname;
    fs.renameSync(xmlfile, workfilename, (err) => {
      if (err) throw err;
    });
    getXmlInfo(workfilename);
  }
  function getXmlInfo(workFl)
  {
    fs.readFileSync(workFl, function(err,data){
      parser.parseString(data, function(err, result){
        if(err){
          console.log('Failing xml');
        } else{
          console.dir('hotfolder014:'+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['ENDEDASYNC']);
          console.dir('Parseee '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']);
          //res.render('parse',{data: result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']});
        }
      });
    });
  }
}
