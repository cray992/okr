var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ObjectiveSchema = new Schema({
  name: String,
  description: String,
  owner: {eid: String, name: String},
  category: String,
  contingency: String,
  tags: [{tid: String, name: String}],
  pobjective: {oid: String},
  keyresults: [{name: String, owner: {eid: String, name: String}, quarter: String, target: Number, actual: Number, units: {uid: String, value: String}}]
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
