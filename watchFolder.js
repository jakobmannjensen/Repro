var chokidar = require('chokidar');
var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var sql = require('mssql');
var config = require('./nogit/reprodb.js');

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
      //console.log('TASKNAME: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['TASKNAME']);
      //console.log('TICKETNAME: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['TICKETNAME']['0']['_']);
      //console.log('TICKETWFLAB: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['TICKETWFLAB']);
      //console.log('OPERATOR: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['OPERATOR']);
      //console.log('STARTED: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['STARTED']);
      console.log('Endedsync: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['ENDEDASYNC']);
      //console.log('Ended: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['ENDED']);
      //console.log('SERVER: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['SERVER']);
      //console.log('STATUS: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['STATUS']);
      //console.log('WORKFLOWSTATUS: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['WORKFLOWSTATUS']);
      //console.log('PRIORITY: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['PRIORITY']['0']['_']);
      //console.log('JOBFOLDERUNC: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['JOBFOLDERUNC']);
      console.log('WFID: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['WFID']);
      console.log('SHORTID: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['SHORTID']);
      console.log('Input length: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['INPUT']['0']['INPUTUNC'].length);
      console.log('Input: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['INPUT']['0']['INPUTUNC']);
      console.log('Output length: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['OUTPUT']['0']['OUTPUTUNC'].length);
      console.log('Output length: '+result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['OUTPUT']['0']['OUTPUTUNC']);
      if(result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['ENDEDASYNC']==undefined)
      {
        addJob_TaskToDB(result);
      }
      else
      {
        completeJobDB(result);
      }
    });
  });
}

function completeJobDB(xmlResult)
{
  console.log('In the addJobToDB');

  var jobId = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['WFID'];
  var workflowName = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['TICKETNAME']['0']['_'];
	var job_ShortID = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['SHORTID'];
	var job_Server = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['SERVER'];
	var job_JobFolder = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['JOBFOLDERUNC'];
	var job_Operator = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['OPERATOR'];
	var job_Priority = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['PRIORITY']['0']['_'];
	var job_StartTime = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['STARTED'];
	var job_EndTime = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['ENDEDASYNC'];
	var job_Status = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['STATUS'];
	var job_WorkflowStatus = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['WORKFLOWSTATUS'];

  new sql.ConnectionPool(config).connect().then(pool =>
    {
      return pool.request().input('AE_JobId', sql.VarChar(100), jobId)
      .input('WorkflowName', sql.VarChar(255), workflowName)
      .input('Job_ShortID', sql.Int, job_ShortID).execute('CompleteAE_Job')
    }).then(result => { console.log('sql success');
      sql.close();
    }).catch(err => { console.log('sql NOT success' +err);
      sql.close();
    });
  };
}

function addJob_TaskToDB(xmlResult)
{
  console.log('In the addJob_TaskToDB');
  var jobId = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['WFID'];
  console.log('JobId injectdb: '+jobId);

  new sql.ConnectionPool(config).connect().then(pool =>
    {
      return pool.request().input('AE_JobId', sql.VarChar(100), jobId).execute('CreateAE_Job')
    }).then(result => { console.log('sql success');
      sql.close();
    }).catch(err => { console.log('sql NOT success' +err);
      sql.close();
    });
  };
}

function addFileToDB()
{
  console.log('In the addFiileToDB');
}

function injectDatabase(xmlResult, dType)
{
  if(dType == 1)
  {
    var jobId = xmlResult['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['WFID'];
    console.log('JobId injectdb: '+jobId);

    new sql.ConnectionPool(config).connect().then(pool =>
      {
        return pool.request().input('AE_JobId', sql.VarChar(100), jobId).execute('CreateAE_Job')
      }).then(result => { console.log('sql success');
        sql.close();
      }).catch(err => { console.log('sql NOT success' +err);
        sql.close();
      });
    };


}
