
var express = require('express');  
var app = express();   
var bodyParser = require('body-parser');  
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })   
app.use(express.static('public')); 
  
app.post('/api/v1/parse', urlencodedParser, function (req, res) {
  try{  
    var data = req.data; 
    var splitdata = data.slice(0,data.indexOf("0000")+4);
    var firstname = splitdata;
    splitdata = data.slice(data.indexOf("0000")+4);
    var lastname = splitdata.slice(0,splitdata.indexOf("000")+3);  
    splitdata = splitdata.split("000");
    var clientid= splitdata[1];
    var retdata = {"firstname": firstname, "lastname": lastname, "clientid":clientid}
    console.log(retdata);  
    res.json({success:200, data:retdata}).end();  
   }
  catch(error){
    res.status(500).send("An error occured..");
  } 
})  
app.post('/api/v2/parse', urlencodedParser, function (req, res) { 
  try{ 
    var data = req.data;
    var splitdata = data.split("0000");
    var firstname = splitdata[0];
    splitdata = splitdata[1].split("000");
    var lastname = splitdata[0];
    var clientid= splitdata[1].slice(0,3) + "-" + splitdata[1].slice(3,splitdata[1].length)
    retdata = {"firstname": firstname, "lastname": lastname, "clientid":clientid}
    console.log(retdata);  
    res.json({success:200, data:retdata}).end();  
  }
  catch(error){
   res.status(500).send("An error occured..");
  }
}) 
var server = app.listen(8080, function () {
  console.log("Application started");
}) 
