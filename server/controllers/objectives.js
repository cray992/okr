var mongoose = require('mongoose'),
Objective = mongoose.model('Objective');
//Stock = mongoose.model('Stocks');

exports.findAll = function(req, res){
  Objective.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findById = function(req, res){
  var id = req.params.id;
  Objective.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.add = function(req, res) {
  console.log(req.body);
  Objective.create(req.body, function (err, obj) {
    if (err) return console.log(err);
    return res.send(obj);
  });
}
exports.update = function(req, res) {
  var id = req.params.id;
  var updates = req.body;

  Objective.update({"_id":id}, req.body,
    function (err, numberAffected) {
      if (err) return console.log(err);
      console.log('Updated %d Objectives', numberAffected);
      res.send(202);
  });
}
exports.addKeyResult = function (req, res) {
  var id = req.params.id;
  var keyResult = req.body;
  console.log('Requested adding new key Result ', keyResult);
}
exports.delete = function(req, res){
  var id = req.params.id;
  Objective.remove({'_id':id},function(result) {
    return res.send(result);
  });
};  
exports.import = function(req, res){
  Objective.create(
    { "name": "IT Objective" },
    { "name": "Healthcare Objective." },
    { "name": "Dad's Objective" },
    { "name": "Watchlist Objective" }
  , function (err) {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};
