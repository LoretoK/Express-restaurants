const express = require('express')
const router = express.Router({mergeParams: true})
//^ mergeParams allows us to merge all the parameters into one path
const {Menu, Restaurant} = require('restaurants')


//making a get(is the method) request to an end point ('/restaurants' would be the address) that has some data on it
router.get('/', function (req,res) { // the function is the request handler, so it recieves a request obj and a response obj
    const restaurantid = req.params.restaurant_id
    const restaurant = Restaurant.all.find(r => r.id == restaurantid)
    res.send(restaurant.menus)
    //^returns all of the restaurants as an array
})
//creating a space for post requests to land
router.post('/', (req,res) => {
    const {title} = req.body
    //^the body of the post request contains the data that is going to be sent to us
    const menu= new Menu(req.params.restaurant_id,title)
    //^extracting the restaurant_id out of the URL path
    const restaurantid = req.params.restaurant_id
    const restaurant = Restaurant.all.find(r => r.id == restaurantid)
    restaurant.addMenu(menu) // this add the specific menu to the specific restaurant instance
    res.status(201).send(menu)
    //^this creates a resource ^ sends the actual data made in the menu
    
})

//to target one menu you need to use a route parameter
router.get('/:menus_id', (req,res) => {  //the :id is the parameter on the route which will be looked up in teh request handler
    const  menuid = req.params.menus_id //any route that matches the endpoint address (in this case has a value after the menus/ ) it's recognised an set as the id 
    const menu = Menu.all.find(menu => Number(menu.id) === Number(menuid)) //this checks the menus array and searches for the menu with the id that matches NB: the id is changed to a number becasue in the URL it's a string
    if(menu){
        res.send(menu) //responds with the menu that has just been found
    } else {
        res.status(404) // if the menu isn't found we'll send 404 status to represent that the menu hasn't been found
    }
})

router.put('/:menus_id', (req,res) =>{ 
    const id = req.params.restaurant_id
    //^getting id out of parameters(:id) which is accessed on the request object
    const menu = Menu.all.find(menu => menu.id === Number(id))
    //find menu with specific id amogst all of the menus 
    if(!menu){
        return res.status(404)
        //^ if there's no menu it'll return a 404
    } else{
        menu.update(req.body)
        //^ the req.body is a JS object that contains the properties of the name and imageURL
        //^ if the menu has been found the menu name and or imageURL is reassigned
        res.send(`${menu.title} was updated OK`) // where the menu is found the update is made
    }
})

router.delete('/:menus_id', (req,res) =>{ 
    const  id = req.params.menus_id
    const menu = Menu.all.find(menu => menu.id === Number(id))
    if(!menu){
        return res.status(404)
    } else{
        menu.delete()// where the menu is found the delete is made
        //^now when you GET the menus the menu with the specific id entered would now be deleted.
        res.send(`${menu.title} with was deleted OK`)
    }
})

module.exports = router
//^ exporting all of the routing out of this file