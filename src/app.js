const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//initialize
const app = express();
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//setting the templating engine hbs and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setting the static directory to serve
app.use(express.static(publicDirectory));

//routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Sasi Kumar M'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Sasi Kumar M'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Please reach out to msasikumarbeeee@gmail.com',
        author: 'Sasi Kumar M'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });

    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Sasi Kumar M',
        errorMessage: 'Help article not found!!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Sasi Kumar M',
        errorMessage: 'Page not found!!'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});