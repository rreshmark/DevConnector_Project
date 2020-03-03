const express= require ('express');//require is used to import lib in js
const mongoose= require('mongoose');
const app= express();


//Db config
const db= require('./config/keys').mongoURI;

//connect to mongodb

mongoose.connect(db)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));


//let's write our first route
app.get('/',(req,res)=> res.send('Hello!'));
const port = 8020;
app.listen(port,()=> console.log(`server running in ${port}`))