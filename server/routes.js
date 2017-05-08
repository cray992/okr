const routes = function(app){
	var objectives = require('./controllers/objectives');
	app.get('/objectives/import', objectives.import);
	app.get('/objectives', objectives.findAll);
	app.get('/objectives/:id', objectives.findById);
	app.post('/objectives', objectives.add);
	app.put('/objectives/:id', objectives.update);
	app.delete('/objectives/:id', objectives.delete);

	app.post('/objectives/:id/keyResults', objectives.addKeyResult);
}

module.exports = routes;