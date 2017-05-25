const mongoose = require('mongoose'),
Objective = mongoose.model('Objective');
Config = mongoose.model('Config');

exports.findAll = function(req, res){
  Objective.find({},function(err, results) {
    return res.send(results);
  });
};

exports.getObjectivesProgress = function(req, res) {
  const q = req.query;
console.log(q);
  const callback = function(err, result) {
    console.log(err);
    return res.send(result);
  }

  Objective.aggregate([
    {$match: {
      'owner.eid': q.eid
    }},
    { $unwind : "$keyresults" },
    {$group: { 
      _id: "$_id",
      "name": { "$first": "$name" },
      "krcount": { "$sum": 1 },
      pcent: { 
        $avg: {
          $divide: [
            "$keyresults.actual", "$keyresults.target"
          ]
        }
      }
    }},
    {$project: {
      _id: 1,
      name : 1,
      pcent: 1,
      krcount: 1
    }} 
  ])
  .exec(callback);
};


exports.checkinKeyResults = function (req, res) {
  const keyScores = req.body.actual;
  console.log('array length: ' + keyScores);
  keyScores.forEach( (x) => {
    const id = x.id; //mongoose.Types.ObjectId(x.id);
    Objective.update(
      {'keyresults._id': id}, 
      {$set: {'keyresults.$.actual': x.actual}},
      {upsert: true},
      function (err, numberAffected) {
        if (err) return console.log(err);
        console.log('Updated %d Objectives', numberAffected);
      });
  });
  res.sendStatus(202);
}

exports.findByName = function(req, res) {
  const q = req.query;
  let qString = '';
  if (q.name) {
    qString = {'name': {'$regex': q.name, $options: 'i'}};
  }

  if (q.eid) {
    qString = {'owner.eid': q.eid};
  }

  console.log(qString);

  Objective.find(qString,function(err, result) {
    return res.send(result);
  });
};

exports.findKeyResultsByEmp = function(req, res) {
  const q = req.query;
  let qString = '';

  if (q.eid) {
    qString = {'keyresults.owner.eid': q.eid};
  }

  const callback = function(err, result) {
    return res.send(result);
  }

  Objective.aggregate(
    { $project : {
        _id : 1,
        name : 1,
        owner: 1,
        keyresults : 1
    }},
    { $unwind : "$keyresults" },
    { $match: {'keyresults.owner.eid': q.eid}}
  ).exec(callback);

};

exports.findById = function(req, res){
  const id = req.params.id;
  Objective.findOne({'_id':id},function(err, result) {
    return res.send(result);
  });
};

exports.add = function(req, res) {
  Objective.create(req.body, function (err, obj) {
    if (err) return console.log(err);
    return res.send(obj);
  });
}

exports.findByTagName = function(req, res){
  const str = req.params.str;
  Objective.find({'tags': [{'name': {'$regex': str, $options: 'i'}}] },function(err, result) {
    console.log(str, result);
    return res.send(result);
  });
};

exports.update = function(req, res) {
  const id = req.params.id;
  const updates = req.body;

  Objective.update({"_id":id}, req.body,
    function (err, numberAffected) {
      if (err) return console.log(err);
      console.log('Updated %d Objectives', numberAffected);
      res.sendStatus(202);
  });
}

exports.addKeyResult = function (req, res) {
  const id = req.params.id;
  const unit = req.body.units;

  if (unit) {
    const query = {domain: 'units', value: unit.value};
    Config.findOneAndUpdate(query, query, {upsert:true}, function(err, doc){
      if (err) console.error(err);
      console.log(doc);
    });
  }

  Objective.findOneAndUpdate({"_id":id}, 
    {$push: {keyresults: req.body}}, {new: true},
    function (err, updatedRec) {
      if (err) return console.log(err);
      res.send(updatedRec);
  });
}

exports.delete = function(req, res){
  const id = req.params.id;
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
