var sql = require('mssql');
var express = require('express');
var config = require('./nogit/reprodb.js');
var fs = require('fs');
var xml2js = require('xml2js');

var app = express();

app.set('view engine', 'ejs');

var parser = new xml2js.Parser();

app.get('/', function(req, res){
  sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      request.query('select * from AAR_AE_Job', function (err, queryresult) {
          if (err) console.log(err)
          //console.log(queryresult);
          sql.close();
          //console.log('teeest '+ differentDesignIDs(queryresult.recordset));
          res.render('index', {data: queryresult.recordset});
      });
  });
});

app.get('/milestones', function(req, res){
  sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      request.query('select * from AAR_AE_Milestone', function (err, queryresult) {
          if (err) console.log(err)
          //console.log(queryresult);
          sql.close();
          //console.log('teeest '+ differentDesignIDs(queryresult.recordset));
          res.render('milestones', {data: queryresult.recordset});
      });
  });
});

app.get('/milestoneTypes', function(req, res){
  sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      request.query('select * from AAR_AE_MilestoneType', function (err, queryresult) {
          if (err) console.log(err)
          //console.log(queryresult);
          sql.close();
          //console.log('teeest '+ differentDesignIDs(queryresult.recordset));
          res.render('milestonetypes', {data: queryresult.recordset});
      });
  });
});

app.get('/parse', function(req, res){
  fs.readFile('t1.xml', function(err,data){
    parser.parseString(data, function(err, result){
      console.log(Object.getOwnPropertyNames(result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']));
        //res.render('parse',{data: JSON.stringify(result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']['TICKETWFLAB'])});
        res.render('parse',{data: result['ntf:NOTIFICATIONS']['EVENT']['0']['TASK']['0']});
    });
  });
});

app.listen('65310');

var differentDesignIDs = function(dbresult)
{
  var theresult = [];
  dbresult.forEach(function(item)
  {
    theresult.push(item.designID);
  });
  var sortedlist = theresult.sort();

  for(i = 0;i<(sortedlist.length-1);i++)
  {
    if(sortedlist[i] == sortedlist[i+1])
    {
      delete sortedlist[i];
    }
  }
  var lastResult = [];
  sortedlist.forEach(function(itemm){
    if(itemm != null)
    {
      lastResult.push(itemm);
    }
  });

  return lastResult;
}
