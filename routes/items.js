const express = require('express')
const router = express.Router({mergeParams: true})
//^ mergeParams allows us to merge all the parameters into one path
const {Menu, Restaurant, Item} = require('restaurants')

//making a get(is the method) request to an end point ('/menus' would be the address) that has some data on it
router.get('/', function (req,res) { // the function is the request handler, so it recieves a request obj and a response obj
    const menuid = req.params.menu_id
    const menu = Menu.all.find(m => m.id == Number(menuid))
    res.send(menu.items)
    //^returns all of the menus as an array
})

//creating a space for post requests to land
router.post('/', (req,res) => {
    const {dish,price} = req.body
    //^the body of the post request contains the data that is going to be sent to us
    const item = new Item(req.params.menu_id,dish,price)
    //^extracting the item out of the URL path
    const menuid = req.params.menu_id // looking through the URL parameters for the menu_id
    const menu = Menu.all.find(m => m.id == menuid)// this looks for the spefiic menu id e.g mains, starter of dessert of which this specific instance of the item will be added to
    menu.addItem(item) // this add the specific item to the specific item instance
    res.status(201).send(item)
    //^this creates a resource ^ sends the actual data made in the item
    
})

//to target one item you need to use a route parameter
router.get('/:items_id', (req,res) => {  //the :id is the parameter on the route which will be looked up in the request handler
    const  itemid = req.params.items_id //any route that matches the endpoint address (in this case has a value after the menus/ ) it's recognised an set as the id 
    const item = Item.all.find(item => Number(item.id) === Number(itemid)) //this checks the item array and searches for the item with the id that matches NB: the id is changed to a number becasue in the URL it's a string
    if(item){
        res.send(item) //responds with the item that has just been found
    } else {
        res.status(404) // if the item isn't found we'll send 404 status to represent that the item hasn't been found
    }
})

router.put('/:items_id', (req,res) =>{ 
    const id = req.params.menu_id
    //^getting id out of parameters(:id) which is accessed on the request object
    const item = Item.all.find(item => item.id === Number(id))
    //find item with specific id amogst all of the item 
    if(!item){
        return res.status(404)
        //^ if there's no item it'll return a 404
    } else{
        item.update(req.body)
        //^ the req.body is a JS object that contains the properties of the title
        //^ if the item has been found the item is reassigned
        res.send(`${item.dish} was updated OK`) // where the item is found the update is made
    }
})

router.delete('/:items_id', (req,res) =>{ 
    const  id = req.params.item_id
    const item = Item.all.find(item => item.id === Number(id))
    if(!item){
        return res.status(404)
    } else{
        item.delete()// where the item is found the delete is made
        //^now when you GET the item the item with the specific id entered would now be deleted.
        res.send(`${item.dish} with was deleted OK`)
    }
})


module.exports = router