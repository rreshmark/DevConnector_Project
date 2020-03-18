const Validator = require ('validator');
const isEmpty = require('./is-empty');

//below is the old way of writing fun. latest way is using => functions.

module.exports= function validateLoginInput(data){ 
  
  //here data is the details of user coming from body parser i.e req.body
//this func will check for all the errors in the form

let errors={};



if (!Validator.isEmail(data.email)){
  errors.email = 'Email is invalid';
}
if (isEmpty(data.email)) {
  errors.email = 'Email field is required';
}

if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
  errors.password = 'Password must be between 6 and 30 characters';
}

if (isEmpty(data.password)) {
  errors.password = 'Password field is required';
}


return {
  errors,
  isValid: isEmpty(errors) //the result of this func is boolean type refer (video 3/7)
  //this boolean is to check if there are errors or not..if true..errors are there else not there
  //to create this boolean ..we need to check if the errors is empty or not..but here the errors is an empty object from beginning..so to do that we are creating a sepearate fun called is-empty and checking wat are the possible ways of 
}

}