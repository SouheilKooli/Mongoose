const express=require('express');
const router=express.Router();
const Person=require("../models/Person");

//test route
//@ route : localhost:3000/persons/test
// router.get('/test', (req, res) => {
//    res.send("this is a test")
// })

//create and save a Record of a Model
//@ route : localhost:3000/persons/addModel
 router.post('/addPerson', (req, res) => {
    const {name,age,favoriteFoods} = req.body
    const newPerson=new Person({
        name,
        age,
        favoriteFoods})
    newPerson.save()//save to DB
    .then(persons=>res.send(persons))
    .catch(err=>console.log(err))
})
//Create many Records with model.create()
router.post("/addMany",(req,res)=>{
    Person.create(req.body)
    .then(persons=>res.send(persons))
    .catch(err=>console.log(err))  
})
//Use model.find()to Search Your Database
router.get("/allPersons",(req,res)=>{
    Person.find({})
    .then(persons=>res.send(persons))
    .catch(err=>console.log(err)) 
 })

 //Use model.findOne() to Return a Single Matching Document from Your Database
 //GET only person by food
 router.get("/:favoriteFoods",(req,res)=>{
    const {favoriteFoods}=req.params;
    Person.findOne({favoriteFoods})
    .then((persons)=>res.send(persons))
    .catch((err)=>console.log(err)) 
 })

 //use model.findById() to Search Your Database By _id
 //Find person byId
 router.get( "/findby/:_id",( req , res ) => {
    const  {_id} = req.params ;
    Person.findById({ _id })
    .then( (persons) => res.send( persons ) )
    .catch((err)=>console.log(err))
 })
 
 //update favoriteFoods and save it
 router.put("/update/:_id",(req,res)=>{
    const {_id}=req.params
    const {favoriteFoods}=req.body;

    Person.findById({_id},(err,data)=>{
        if(err){console.log(err)}
        else {data.favoriteFoods.push(favoriteFoods)};
        data.save((err,data)=>{
          if(err){console.log(err)}
          else {console.log(data),res.send(data)}
        })   
   })
});

//Perform New Updates on a Document Using model.findOneAndUpdate()
//find a person by name,update his age
router.put("/UpdateAge",(req,res)=>{
    const {name,age}=req.body
    Person.findOneAndUpdate({name},{age},{new: true} ,(err,data)=>{
        if(err){console.log(err)}
        else{console.log(data);res.send(data)}                   
        })
    })

//Delete One Document Using model.findByIdAndRemove
    router.delete("/deletePerson/:_id",(req,res)=>{
        const{_id}=req.params
        Person.findOneAndDelete({_id})
        .then( persons => res.send( persons ) )
    .catch(err=>console.log(err))
    })

//Delete many persons with specified name with model.remove()   
 router.delete("/removeMany",(req,res)=>{
    const {name}=req.body;
    Person.remove({name} ,(err,data)=>{
        if(err){console.log(err)}
        else{console.log(data);res.send(data)}                   
        })
    })
    
//Chain Search Query Helpers to Narrow Search Results
//search peoples who like burrito,sort them by name,limit the result to 2 documents and hide age field
router.get("/search/:favoriteFoods",(req,res)=>{
    const {favoriteFoods}=req.params;
    Person.find({favoriteFoods:{$all:[favoriteFoods]}})
        .sort({name:'1'})
        .limit(2)
        .select('-age')
        .exec((err,data)=>{
    if(err){console.log(err)}
    else{console.log(data);res.send(data)}
  })
    })

module.exports=router