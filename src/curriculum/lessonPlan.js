/* This is the lessonPlan! It serves as the 
single source of truth for the entire 
curriculum. Changing something here will
filter throughout the entire app. Every 
module is exported from its own file 
in the modules directory. */

module.exports = [
	require('./modules/01-HTML_&_CSS.js'),
	require('./modules/02-Basic_JavaScript.js'),
	require('./modules/03-Deeper_CSS.js'),
	require('./modules/04-More_JavaScript.js'),
	require('./modules/05-Responsive_Design.js'),
	require('./modules/06-Advanced_JavaScript.js'),
	require('./modules/07-APIs.js'),
	require('./modules/08-React.js')
]