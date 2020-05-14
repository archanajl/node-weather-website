const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000
const ip = process.env.IP



// define paths
const publicpath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicpath))

app.get('',(req,res) => {
    res.render('index',{title:'Author',name:'Archana',date:'May 2020',author:'Archana'})
})

app.get('/about',(req,res) =>{
    res.render('about',{title:'My Cutie',name:'Anjana',date:'May 2020',author:'Archana'})
})
app.get('/help',(req,res) =>{
    res.render('help',{message:'We will provide you with the weather if you give us your location. ',date:'May 2020',author:'Archana'})
})

app.get('/weather', (req,res) => {
    if(!req.query.address)
    {
        return res.send({error: 'Please provide an address'})
    }
    geocode(req.query.address,(error,{location,latitude,longtitude} = {} ) => {
        if(!error)
        {
        forecast(latitude,longtitude, (error, {forecastData} = {}) => {
            if (error)
            {
            return res.send({error})
            }
            else
            {
                res.send({
                    address:req.query.address,
                    forecast: forecastData,
                    location: location
                })
            }
        })
        }
        else
        {
            res.send({error})
        }
    })
})


app.get('/help/*',(req,res) => {
    res.render('err404',{errmessage: ' Article Not Found. Try another word',date:'May 2020',author:'Archana'})
})


app.get('*',(req,res) => {
    res.render('err404',{errmessage: ' 404 : Page Not Found',date:'May 2020',author:'Archana'})
})

app.listen(port,() => {
    console.log("Server is up at port " + port)
})