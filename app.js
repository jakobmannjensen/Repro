var sql = require('mssql');
var express = require('express');
var config = require('./nogit/reprodb.js');

var app = express();

app.set('view engine', 'ejs');


app.get('/', function(req, res){
  sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      request.query('select * from AAR_AE_Job', function (err, queryresult) {
          if (err) console.log(err)
          console.log(queryresult);
          sql.close();
          console.log('teeest '+ differentDesignIDs(queryresult.recordset));
          res.render('index', {data: queryresult.recordset,kinds: differentDesignIDs(queryresult.recordset)});
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
