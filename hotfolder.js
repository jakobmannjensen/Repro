var fs = require('fs');
var xml2js = require('xml2js');
var glob = require('glob');
var path = require('path');

var parser = new xml2js.Parser();

var settingsFile = './Settings/configuration.xml';
var scanfolder = '';
var workfolder = '';

module.exports.startHotfolder = function(){
  console.log('hotfolder001: Starting tha hotfolder');
  fs.readFileSync(settingsFile, function(err,data){
    if(err)
    {
      console.log("ERROR");
    }
    console.log('hotfolder002: In the readfilesync method');
    parser.parseString(data, function(err, result){
      console.dir('hotfolder003: '+result['hotfolder']);
      console.log('hotfolder004: Result from settings xml: '+result);
    });
  });
  console.log('hotfolder005: Hotfolder running');
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
    } else {
      console.log('hotfolder007: '+res);
    }
    console.log('hotfolder008: length: '+res.length);
    for(var f in res)
    {
      if(res[f].includes('.xml'))
      {
        console.log('hotfolder009: '+res[f]);
        processXML(res[f]);
      }
    }
    console.log('hotfolder010: Waiting for new folder scan');
    setTimeout(scanHotfolder, 10000);
  });

  function processXML(xmlfile)
  {
    console.log('hotfolder011: Start processXML');
    var bname = path.basename(xmlfile);
    var workfilename = '/Users/jakobmannjensen/Documents/NodeJS/workfolder/'+bname;
    fs.renameSync(xmlfile, workfilename, (err) => {
      if (err) throw err;
    });
    console.log('hotfolder012: Renamed: '+workfilename);
    getXmlInfo(workfilename);

    console.log('hotfolder016: End processXML');
  }
  function getXmlInfo(workFl)
  {
    console.log('hotfolder-getXmlInfo001: Start function');
    fs.readFileSync(workFl, function(err,data){
      console.log('hotfolder015: Start readfilesync');
      parser.parseString(data, function(err, result){
        if(err){
          console.log('Failing xml');
        } else{
          console.log('hotfolder013: In readFileSync');
          console.dir('hotfolder014:'+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['ENDEDASYNC']);
          console.dir('Parseee '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']);
          //res.render('parse',{data: result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']});
        }
      });
    });
  }
}
