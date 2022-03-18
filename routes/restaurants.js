const express = require('express')
const router = express.Router()
const {Restaurant} = require('restaurants')
 
//creating routes to handle particular requests

//reading all the restaurants//making a get(is the method) request to an end point ('/restaurants' would be the address) that has some data on it
router.get('/', function (req,res) { // the function is the request handler, so it recieves a request obj and a response obj
    res.send(Restaurant.all)
    //^returns all of the restaurants as an array
})
//creating a restaurant//creating a space for post requests to land
router.post('/', (req,res) => {
    const {name, imageURL} = req.body
    //^the body of the post request contains the data that is going to be sent to us
    const restaurant= new Restaurant(name, imageURL)
    //^extracting the values out of request body and create a new restaurant
    res.status(201).send(restaurant)
    //^this creates a resource ^ sends the actual data made in the restaurant
    
})

//reading ONE restaurant//to target one restaurant you need to use a route parameter
router.get('/:id', (req,res) =>{  //the :id is the parameter on the route which will be looked up in teh request handler
    const  id = req.params.id //any route that matches the endpoint address (in this case has a value after the restaurants/ ) it's recognised an set as the id 
    const restaurant = Restaurant.all.find(restaurant => restaurant.id === Number(id)) //this checks the restaurants array and searches for the restaurant with the id that matches NB: the id is changed to a number becasue in the URL it's a string
    if(restaurant){
        res.send(restaurant) //responds with the restaurant that has just been found
    } else {
        res.status(404) // if the restaurant isn't found we'll send 404 status to represent that the restaurant hasn't been found
    }
})
//updating ONE restaurant
router.put('/:id', (req,res) =>{ 
    const id = req.params.id
    //^getting id out of parameters(:id) which is accessed on the request object
    const restaurant = Restaurant.all.find(restaurant => restaurant.id === Number(id))
    //find restaurant with specific id amogst all of the restaurants 
    if(!restaurant){
        return res.status(404)
        //^ if there's no restaurant it'll return a 404
    } else{
        restaurant.update(req.body)
        //^ the req.body is a JS object that contains the properties of the name and imageURL
        //^ if the restaurant has been found the restaurant name and or imageURL is reassigned
        res.send(`${restaurant.name} was updated OK`) // where the restaurant is found the update is made
    }
})
//deleting ONE restaurant
router.delete('/:id', (req,res) =>{ 
    const  id = req.params.id
    const restaurant = Restaurant.all.find(restaurant => restaurant.id === Number(id))
    if(!restaurant){
        return res.status(404)
    } else{
        restaurant.delete()// where the restaurant is found the delete is made
        //^now when you GET the restaurants the restaurant with the specific id entered would now be deleted.
        res.send(`${restaurant.name} with was deleted OK`)
    }
})

module.exports = router
//^ exporting all of the routing out of this file