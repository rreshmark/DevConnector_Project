const mongoose= require('mongoose');
const Schema= mongoose.Schema;

//Creating instance of Schema using new keyword in the name of userSchema
const ProfileSchema = new Schema({
//In my profile model i'm having a user object which relates to a uniqu id that belongs to a users cllection .
//we are deveoping a relationship between profile and user model by the below steps.
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle:{
    type:String,
    required:true,
    max:40
  },
  company:{
    type:String
  },
  website:{
    type:String
  },
  location:{
    type:String
  },
  status:{
    type:String,
    required:true
  },
  skills:{
    type:[String],
    required:true
  },
  bio:{
    type:String
  },
  githubusername:{
    type:String
  },
  experience:[{
    title:{
      type:String,
      required:true
    },
    company:{
      type:String,
      reuired:true
    },
    location: {
      type: String
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  education:[{

    school: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    fieldofstudy: {
      type: String,
      required: true
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    }
  }],
  social:{
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});
module.exports= Profile = mongoose.model('profile',ProfileSchema);
  