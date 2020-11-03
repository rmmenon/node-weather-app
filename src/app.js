const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// app
const app = express();
// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Menon"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Menon"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "Help for the weather app.",
        name: "Menon"
    })
})

app.get("/weather", (req, res) => {
    const address = req.query.address;
    if(!address) {
        return res.send(
            {error: "Address must be provided"}
        )
    }
    geocode( address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }
            console.log(location)
            console.log(forecastData)
            return res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    });

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Menon",
        errorMessage: "Help article not found."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Menon",
        errorMessage: "Page not found."
    })
})


app.listen(3000, () => {
  console.log("Server is up on port 3000")
}
)
