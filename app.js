const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
var exphbs = require('express-handlebars');

// mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

// const Review = require('./models/review')


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));


// const Review = require('./models/review');
const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
const movies = require('./controllers/movies')(app);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app
