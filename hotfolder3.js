var fs = require('fs');
var xml2js = require('xml2js');
var glob = require('glob');
var path = require('path');
var parser = new xml2js.Parser();
var settingsFile = './Settings/configuration.xml';
var scanfolder = '';
var workfolder = '';
var firstreadfile = '';
var firstwritefile = '';
var rjct = 'notsuccessful';


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
  var getDirectories = function (src, callback) {
    glob(src + '/**/*', callback);
  };
  getDirectories('/Users/jakobmannjensen/Documents/NodeJS/hotfolder', function (err, res) {
    if (err) {
      console.log('Error', err);
    }
    firstreadfile = '';
    firstwritefile = '';
    /*
    for(var f in res)
    {
      if(res[f].includes('.xml'))
      {
        processXML(res[f]);
      }
    }
    */
    if(res.length>0){
      if(res[0].includes('.xml'))
      {
        firstreadfile = res[0];

        prom.then((fwrite)=>{
          getXmlInfo(fwrite);
        }, (errr)=>{
          console.log('ErrorFuck '+errr);
        }
        );
      }
    }
    setTimeout(scanHotfolder, 10000);
  });
}

  function moveToWorkfolder()
  {
    console.log('1');
    if(firstreadfile==''){return false}
    console.log('2');
    var bname = path.basename(firstreadfile);
    firstwritefile = '/Users/jakobmannjensen/Documents/NodeJS/workfolder/'+bname;
    fs.renameSync(firstreadfile, firstwritefile, (err) => {
      if (err) return false;
    });
    return true;
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

  var prom = new Promise((resolve, reject) =>{
    if(moveToWorkfolder()){
      resolve(firstwritefile);
    } else {
      reject(rjct);
    }
  });
