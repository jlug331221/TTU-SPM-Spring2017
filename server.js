var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var dishes = require('./routes/dishes');

var app = express();
app.set('port', process.env.PORT || 3000);

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static folder for the client
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', dishes);

app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});
