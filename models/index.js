module.exports = {

	//Admin
	user 						: require('./admin').user,
	group						: require('./admin').group,
	newFeed					: require('./admin').newFeed,
	userMsg					: require('./admin').userMsg,

//navbar
	navbar 					: require('./navbar/navbar_model'),
	
	worktask				: require('./worktask').wt,

	typeot					: require('./worktask').typeot,

	trb							: require('./worktask').trb,

	celula					: require('./worktask').celula,

	tec							: require('./worktask').tec,

	escala					: require('./escala/escala_model'),

	OT							: require('./OT'),
	
	boni						: require('./boni'),

	km 							: require('./km')

	//chat						: require('./chat').chat_model
	}