const routes = function(app){
	var objectives = require('./controllers/objectives');
	var employees = require('./controllers/employees');

	app.get('/objectives', objectives.findAll);
	app.get('/objectives/:id', objectives.findById);
	app.post('/objectives', objectives.add);
	app.put('/objectives/:id', objectives.update);
	app.delete('/objectives/:id', objectives.delete);
	app.get('/objectives/import', objectives.import);

	app.post('/objectives/:id/keyresults', objectives.addKeyResult);

	app.get('/employees/find/:str', employees.findByName);
	app.get('/employees/import', employees.import);

}

module.exports = routes;