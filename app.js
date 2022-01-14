const express = require('express');
const path = require('path');

var app = new express();
var port = 3000;

app.listen(port, function(err){
    if(typeof(err) === 'undefined'){
        console.log('Server listening on port ' + port);
    }
});

app.use(express.static('public'));
// app.use(express.static('src/views'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'src/index.html'));
});
app.get('/threeCanvases', function(req, res){
    res.sendFile(path.join(__dirname, 'src/views/three_canvases.html'));
});
app.get('/translate', function(req, res){
    res.sendFile(path.join(__dirname, 'src/views/translation.html'))
});