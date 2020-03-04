const mongoose= require('mongoose');
const Schema= mongoose.Schema;

//Creating instance of Schema using new keyword in the name of userSchema
const userSchema = new Schema({
  name:{
         type:String,
         required:true
  },
  email:{
          type:String,
          required:true
  },
  password:{
             type:String,
             required:true
  },
  avatar:{
           type: String,
           required:false
  },
  date:{
         type:Date,
         default:Date.now
  }
});
//below we are saying mongoose to create a collection called users in db which has a reference from userSchema and we are referring that model in our code as User
//now we are exporting that User model to whereever required in the code
module.exports=User = mongoose.model("users",userSchema);

