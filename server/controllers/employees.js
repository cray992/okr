var mongoose = require('mongoose'),
Employee = mongoose.model('Employee');

exports.findAll = function(req, res){
  Employee.find({},function(err, results) {
    return res.send(results);
  });
};

exports.findById = function(req, res){
  var id = req.query.eid;
  Employee.findOne({'_id':id},function(err, result) {
    if (err) res.send(err);
    return res.send(result);
  });
};

exports.findByName = function(req, res){
  var str = req.query.name;
  if (str.length === 0 ) return res.send([]);

  Employee.find({'name': {'$regex': str, $options: 'i'} },function(err, result) {
    return res.send(result);
  });
};

exports.add = function(req, res) {
  Employee.create(req.body, function (err, employee) {
    if (err) return console.log(err);
    return res.send(obj);
  });
}

exports.import = function(req, res){
  Employee.create(
    { "name": "XXXXX", "email": "XXXXX@changehealthcare.com", "manager": "XXXXX@McKesson.com" },
    { "name": "XXXXX", "email": "XXXXX@changehealthcare.com", "manager": "XXXXXX@changehealthcare.com" },
    { "name": "XXXXX", "email": "XXXXX@changehealthcare.com", "manager": "XXXXXX@changehealthcare.com" },
    { "name": "XXXXX", "email": "XXXXXX@changehealthcare.com", "manager": "XXXXXX@McKesson.com" },
    { "name": "XXXXX", "email": "XXXXX@McKesson.com", "manager": "XXXXXX@changehealthcare.com" },
    { "name": "XXXXX", "email": "XXXXXX@changehealthcare.com", "manager": "XXXXX@changehealthcare.com" },
    { "name": "XXXXX", "email": "XXXXX@changehealthcare.com", "manager": "XXXXXo@changehealthcare.com" },
    { "name": "XXXXX", "email": "XXXXXX@changehealthcare.com" }
  , function (err) {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};
