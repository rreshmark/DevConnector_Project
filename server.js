const express= require ('express');//require is used to import lib in js
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const users= require('./routes/api/users');
const profile= require('./routes/api/profile');
const posts= require('./routes/api/posts');
const passport=require('passport');
const app= express();

//Body parser middleware or (function)
//urlencoded is used if user types in any special character in the field,that needs to be parsed in to json..and there are extensions that we can customise.here we are setting it to false
//bodyparser has so many functions..we want only json conversion..so using json()
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//passport middleware

app.use(passport.initialize());

//passportconfig
require('./config/passport')(passport)

//Db config
const db= require('./config/keys').mongoURI;

//connect to mongodb

mongoose.connect(db)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));


//let's write our first route
app.get('/',(req,res)=> res.send('Hello!'));
app.use('/api/users', users);
//we are saying express instance (app here) to navigate to users.js file when it sees a url of /api/users.
app.use('/api/profile',profile);
app.use('/api/posts', posts);

const port = 8020;
app.listen(port,()=> console.log(`server running in ${port}`));