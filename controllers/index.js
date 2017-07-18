
module.exports = {
	//Admin
	group 						: require('./admin').group,
	user 							: require('./admin').user,
	newFeed 					: require('./admin').newFeed,
	escala						: require('./escala'),
	//Main pages
	newsfeed 					: require('./mainpages').newsfeed,
	home							: require('./mainpages').home,

	worktask					: require('./worktask'),
	deadlinecontrol		: require('./deadlinecontrol'),
	reporting 				: require('./reporting'),
	km 								: require('./km')
	

}