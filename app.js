var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);
var morgan = require("morgan");



var port = process.env.PORT || 3000;
var host = process.env.IP || "localhost";

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.set('views', './views'); 
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('home');
});

io.on('connection', function(socket){
    socket.on('stock added', function(stock){
        io.emit('stock added', {
            data: stock.data,
            series: stock.series
        });
    });
});

http.listen(port,host, function(){
    console.log(`https://${host}:${port}/`);
})