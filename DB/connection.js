const mongoose=require('mongoose')
const connectionString=process.env.DB_Connection_String

mongoose.connect(connectionString).then(()=>{
    console.log("Mongo DB Atlas connected with cLServer!!");
}).catch((err)=>{
    console.log("Mongo DB Atlas Connection Failed!!!",err);
})