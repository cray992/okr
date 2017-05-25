const routes = function(app){
	var objectives = require('./controllers/objectives');
	var employees = require('./controllers/employees');
	var config = require('./controllers/config');
	var comments = require('./controllers/comments');

	app.get('/empobjprogress', objectives.getObjectivesProgress);
	app.get('/objectives/filter', objectives.findByName);
	// app.get('/objectives/hierarchy', objectives.getParentObjectives);
	app.get('/objectives', objectives.findAll);
	app.get('/objectives/:id', objectives.findById);

	app.post('/objectives', objectives.add);
	app.put('/objectives/:id', objectives.update);
	app.delete('/objectives/:id', objectives.delete);
	app.get('/objectives/import', objectives.import);

	app.post('/objectives/:id/keyresults', objectives.addKeyResult);
	app.post('/keyresults/checkin', objectives.checkinKeyResults);

	app.get('/keyresults/filter', objectives.findKeyResultsByEmp);

	app.get('/employees/filter', employees.findByName);
	app.get('/employees/import', employees.import);

	app.get('/config', config.findByName);

	app.post('/comments', comments.addNewComment);
	app.get('/comments', comments.getCommentsByRefId);

}

module.exports = routes;