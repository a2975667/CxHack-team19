var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 5000;

app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


/*
app.get('/:flightId/:userId', function(req, res){
   res.render('../index.ejs',req.params);
  //res.send(req.params.flightId);
  //res.sendFile(__dirname + '/index.html');
});*/

app.get('/lobbypreflight', function(req, res){
  // req.query={
  //   flightId :'CX1230',
  //   userId : 'Bob'
  // };
   res.render('lobbypreflight.ejs',req.query);
});

app.get('/lobbyinflight', function(req, res){
  // req.query={
  //   flightId :'CX1230',
  //   userId : 'Bob'
  // };
   res.render('lobbyinflight.ejs',req.query);
});

app.get('/lobbyinflight_30', function(req, res){
   res.render('lobbyinflight_30.ejs',req.query);
});

app.get('/lobbypostflight', function(req, res){
   res.render('lobbypostflight.ejs',req.query);
});

app.get('/:filename', function(req, res){
  res.sendFile(__dirname + '/public/' + req.params.filename + '.html');
});

io.on( 'connection', function( socket ) {
  var id;

  //do nothing when disconnected
  socket.on( 'disconnect', function() {
  } );

  //join the same socket if on same id
  socket.on( 'register', function( data ) {
    console.log(data);
    id = data;
    socket.join( data );
  } );

  //broadcast the message within the same socket
  socket.on( 'chat', function( data ) {
    io.to( id ).emit( 'chat', data );
  } );
} );

/*http.listen(5000, function(){
  console.log('listening on *:5000');
});*/

http.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
