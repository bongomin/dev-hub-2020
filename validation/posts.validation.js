const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function postsValidator(data) {
   let errors = {};


   data.text = !isEmpty(data.text) ? data.text : "";

   if (!Validator.isLength(data.text, { min: 15, max: 200 })) {
      errors.text = 'Post must be between 15 and 200 characters'
   }

   if (Validator.isEmpty(data.text)) {
      errors.text = ' Text field is require...'
   }


   return {
      errors,
      isValid: isEmpty(errors)
   }

}