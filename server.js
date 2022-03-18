const express = require('express');
const {Restaurant, Menu, Item} = require('restaurants')
const restaurantRoutes = require('./routes/restaurants')
const menuRoutes = require('./routes/menus')
const itemRoutes = require('./routes/items')
const app = express();
const port = process.env.port || 3000;

//a web server serving static pages
app.use(express.static('public'));

//this encoudes and decodes our json
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/restaurants', restaurantRoutes)
app.use('/restaurants/:restaurant_id/menus', menuRoutes)
app.use('/restaurants/:restaurant_id/menus/:menu_id/items', itemRoutes)
//addres is given so it knows what to prefix the route from route restaurant file to e.g /restaurants or /restaurants/:id


app.listen(port, () => {
    Item.init()
    Menu.init()
    Restaurant.init()
    //^ensuring the table is created
    console.info(`Server listening at http://localhost:${port}`)
    console.log(`With $SHELL set to ${process.env.DATABASE_URL}`) // This is logging our environmental variable
    console.log(`With $NAME set to ${process.env.NAME}`)
})

//In the code above we configure the server to serve static assets from the public/ folder and to run locally on port 3000.