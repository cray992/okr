var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ObjectiveSchema = new Schema({
  name: String,
  keyresults: [{name: String}]
});

ObjectiveSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();  
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

mongoose.model('Objective', ObjectiveSchema);
