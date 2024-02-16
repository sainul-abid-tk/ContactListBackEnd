const mongoose=require('mongoose')

const contactSchema=new mongoose.Schema({
    name:{
     type:String,
     required:true
    },
    number:{
        type:String,
        required:true,
        unique:true
    }
})

const contacts=mongoose.model('contacts',contactSchema)

module.exports=contacts