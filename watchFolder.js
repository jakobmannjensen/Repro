var chokidar = require('chokidar');
var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var watcher = chokidar.watch('/Users/jakobmannjensen/Documents/NodeJS/hotfolder', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
  //console.log(event, path);
});

watcher
  .on('add', function(fpath) {
    copyToWorkfolder(fpath);
  })
  //.on('add', function(path) {console.log('File', path, 'has been Added');})
  //.on('change', function(path) {console.log('File', path, 'has been changed');})
  //.on('unlink', function(path) {console.log('File', path, 'has been removed');})
  .on('unlink', function(fpath) {getXmlInfo('/Users/jakobmannjensen/Documents/NodeJS/workfolder/'+path.basename(fpath));})
  //.on('error', function(error) {console.error('Error happened', error);})

function copyToWorkfolder(ff)
{
  fs.renameSync(ff, '/Users/jakobmannjensen/Documents/NodeJS/workfolder/'+path.basename(ff) , (err) =>
    {
      if (err){console.log('false');}
    }
  )
}

function getXmlInfo(workFl)
{
  fs.readFile(workFl, function(err,data){
    parser.parseString(data, function(err, result){
      console.log('TASKNAME: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['TASKNAME']);
      console.log('TICKETNAME: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['TICKETNAME']['0']['_']);
      console.log('TICKETWFLAB: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['TICKETWFLAB']);
      console.log('OPERATOR: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['OPERATOR']);
      console.log('STARTED: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['STARTED']);
      console.log('Endedsync: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['ENDEDASYNC']);
      console.log('Ended: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['ENDED']);
      console.log('SERVER: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['SERVER']);
      console.log('STATUS: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['STATUS']);
      console.log('WORKFLOWSTATUS: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['WORKFLOWSTATUS']);
      console.log('PRIORITY: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['PRIORITY']['0']['_']);
      console.log('JOBFOLDERUNC: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['JOBFOLDERUNC']);
      console.log('WFID: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['WFID']);
      console.log('SHORTID: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['SHORTID']);
      console.log('Input length: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['INPUT']['0']['INPUTUNC'].length);
      console.log('Input: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['INPUT']['0']['INPUTUNC']);
      console.log('Output length: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['OUTPUT']['0']['OUTPUTUNC'].length);
      console.log('Output length: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['OUTPUT']['0']['OUTPUTUNC']);
    });
  });
}
