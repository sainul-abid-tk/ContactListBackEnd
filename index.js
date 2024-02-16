require('dotenv').config()
const express=require('express')
const cors=require('cors')
const contacts = require('./Models/Contact')
const route=express.Router()
const cLServer=express()
require('./DB/connection')
cLServer.use(cors())
cLServer.use(express.json())
cLServer.use(route)


const PORT=4000 || process.env.PORT

cLServer.listen(PORT,()=>{
    console.log(`Contact List Server Started at PORT ${PORT}`);
})

cLServer.get('/',(req,res)=>{
    res.status(200).send("<h1>Contact List Server Satarted !!! Waiting For Client Request...</h1>")
})

// add Contacts
route.post('/addcontact',async(req,res)=>{
    const {name,number}=req.body
    try{
        const existingContact=await contacts.findOne({number})
        if(existingContact){
            res.status(406).json("This Number is already exist!!!")
        }else{
            const newContact=new contacts({
                name,number
            })
            await newContact.save()
            res.status(200).json(newContact)
        }
    }catch(err){
        res.status(401).json(err)
    }
})

// get All Contacts
route.get('/getcontacts',async(req,res)=>{
    try{
        const allcontacts=await contacts.find().sort({name:1})
        res.status(200).json(allcontacts)
    }catch(err){
        res.status(401).json(err)
    }
})
// delete A Contact
route.delete('/deltecontact/:id',async(req,res)=>{
    const {id}=req.params
    try{
        await contacts.deleteOne({_id:id})
        res.status(200).json(true)
    }catch(err){
        res.status(401).json(err)
    }
})
// edit Contact
route.put('/editcontact/:id',async(req,res)=>{
    const {name,number}=req.body
    const {id}=req.params
    try{
        await contacts.updateOne({_id:id},{
            name,number
        })
        res.status(200).json(true)
    }catch(err){
        res.status(401).json(err)
    }
})


