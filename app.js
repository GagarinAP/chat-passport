let express      = require('express');
let mongoose     = require('mongoose');
let passport     = require('passport');
let path         = require('path');
let favicon      = require('serve-favicon');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let session      = require('express-session');
let configDB     = require('./config/database.js');
let app          = express();
let server       = require('http').Server(app);
let io           = require('socket.io')(server);
let moment       = require('moment');
let usernames    = [];

let port = process.env.PORT || '8080';

mongoose.Promise = global.Promise;
mongoose.connect(configDB.url); 

require('./config/passport.js')(passport);

app.set('port', port);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'helloworld', 
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

require('./app/routes.js')(app, passport);


io.on('connection', function (socket) {

    socket.on('new:user', function(data){
        //console.log(data);
        socket.username = data;
        usernames.push(socket.username);
        updateUsers();
    });

    socket.on('status:message', function (data) {
        if(!socket.username) {
            return;
        }
        io.sockets.emit('status:message', {status: data.length > 0, userWhoTypingMessage: socket.username});
    });

    socket.on('send:message', function (data) {
        let timemoment = moment.utc().format('YYYY-MM-DD HH:mm:ss');
        io.sockets.emit('new:message', {date: timemoment, msg: data, nick: socket.username});
    });

    socket.on('disconnect', function (data) {
        if(!socket.username) {
            return;
        }
        usernames.splice(usernames.indexOf(socket.username),1);
        updateUsers();
    });

    function updateUsers() {
        io.sockets.emit('usernames', usernames);
    }
});

server.listen(port, () => {
    console.log('Server run *:8080');
});
