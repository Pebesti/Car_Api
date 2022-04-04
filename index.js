const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios');

const app = express();

const path = require('path')

app.use(session({
    secret: 'keyboard cat5 run all 0v3r',
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs(
    { 
    defaultLayout: 'main',
    layoutsDir: `${__dirname}/views/layouts` }
   ));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
   axios.get('http://api-tutor.herokuapp.com/v1/cars')
  .then(function (response) {
     let carsArray = [];
     response.data.map((cars)=>{
         carsArray.push(cars);
     });
     res.render('main', 
         {
             layout: 'main',
             cars: carsArray
         });
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });

    
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
    console.log('started on: ', this.address().port);
});
