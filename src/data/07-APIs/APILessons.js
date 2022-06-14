module.exports = {
	moduleName: '07 - APIs',
	lessons: [
		{
			lessonName: 'External APIs',
			lessonDescription: "Learn how to work with web-based APIs", 
			exerciseDescription: "Implement the submitName and getJoke functions in script.js. See the comments above the function declarations for more details.",
			submissionDescription: "Paste the entire contents of script.js that you wrote in the above sandbox into the textarea below. You have unlimited submissions, and only your latest submission will be recorded.",
			introVideoUrl: "https://player.vimeo.com/video/719242987?h=74a103f679&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			codeSandBoxUrl: "https://codesandbox.io/embed/apis-01-external-call-9xh1c7?fontsize=14&hidenavigation=1&theme=dark",
			answerVideoUrl: "https://player.vimeo.com/video/720403297?h=ccaa39d2a3&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			quiz: [
				{
					question: 'Within regular JavaScript code, the await keyword: ',
					answerChoices: [
						"Causes the async function to pause until a Promise is resolved",
						"Can only be used inside an async function",
						"Only makes the async function wait and not the rest of the program",
						"All of the above"
					],
					correctAnswerIndex: 3
				},
				{
					question: 'Which of the following code snippets correctly makes a GET request to https://random.dog/woof.json and prints the json result to the console?',
					answerChoices: [
						`async function fetchDog() {
	const rawResponse = await fetch('https://random.dog/woof.json')
	const json = await rawResponse.json()
	console.log(json)
}`,
						`async function fetchDog() {
	const rawResponse = await fetch(https://random.dog/woof.json)
	const json = await rawResponse.json()
	console.log(json)
}`,
						`async function fetchDog() {
	const rawResponse = fetch(https://random.dog/woof.json)
	const json = await rawResponse.json()
	console.log(json)
}`,
						`async function fetchDog() {
	const rawResponse = await fetch('https://random.dog/woof.json')
	const json = rawResponse.json()
	console.log(json)
}`
					],
					correctAnswerIndex: 0
				},
				{
					question: "Create a new project and make a GET request to https://jsonplaceholder.typicode.com/posts/. Turn the API's response into JSON format. What is the length (accessible through the .length property) of the resulting JSON object?",
					answerChoices: [
						"10",
						"100",
						"1000",
						"10000"
					],
					correctAnswerIndex: 1
				}
			]	
		},
		{
			lessonName: 'Intro to Express',
			lessonDescription: "Build your own API backend and learn how to access it from your user-facing frontend", 
			exerciseDescription: "Edit app.js so that you are statically serving up the contents of the public directory. Also, create a new route to handle GET requests at the '/hello' path. See the comments for more details. On this assignment, YOU WILL NEED TO OPEN THE SANDBOX IN THE BROWSER, SIGN INTO YOUR CODESANDBOX ACCOUNT AND FORK THE REPO.",
			submissionDescription: "Paste the entire contents of app.js that you wrote in the above sandbox into the textarea below. You have unlimited submissions, and only your latest submission will be recorded.",
			introVideoUrl: "https://player.vimeo.com/video/719243010?h=327950ca34&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			codeSandBoxUrl: "https://codesandbox.io/embed/apis-02-intro-to-express-n7jm8v?codemirror=1&fontsize=14&hidenavigation=1&theme=dark",
			answerVideoUrl: "https://player.vimeo.com/video/720403326?h=63f70d84ab&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			quiz: [
				{
					question: 'Which of the following code snippets correctly imports express and creates a new Express application?',
					answerChoices: [
						`const express = require('express')
app = express()`,
						`import 'express' as express
const app = express()`,
						`const express = require('express')
const app = express()`,
						`import express from 'express'
const app = express()`
					],
					correctAnswerIndex: 2
				},
				{
					question: 'Which of the following code snippets creates a new route that responds to GET requests at the /pirates path by sending the string "Booty"?',
					answerChoices: [
						`app.post('/booty', (req, res) => {
	res.redirect('/pirates')
})`,
						`app.get('/pirates', (req, res) => {
	res.sendFile(__dirname + '/pirates.html')
})`,
						`app.get('/booty', (req, res) => {
	res.send('Booty')
})`,
						`app.get('/pirates', (req, res) => {
	res.send('Booty')
})`
					],
					correctAnswerIndex: 3
				},
				{
					question: 'Which of the following code snippets makes the Express application listen on port 8080 and console log "Server is now running" when the app starts up?',
					answerChoices: [
						"app.listen(80)",
						"app.listen(8080, () => console.log('Server is now running'))",
						`app.listen(8080, function()  => {
	console.log("Server is now running")
})`,
						`app.listen(8080, function() {
	console.log("Howdy")
})`
					],
					correctAnswerIndex: 1
				},
				{
					question: 'Which of the following types of data can be sent through an HTTP response?',
					answerChoices: [
						"Text",
						"HTML and HTML files",
						"HTTP status codes",
						"All of the above"
					],
					correctAnswerIndex: 3
				},
				{
					question: 'Retrieving the text portion of an HTTP response object is: ',
					answerChoices: [
						"Synchronous",
						"Instant",
						"Asynchronous",
						"Falsey"
					],
					correctAnswerIndex: 2
				},
				{
					question: 'In this lesson, we: ',
					answerChoices: [
						"Used Express to serve up an HTML file. That HTML file has a linked JavaScipt file that we used to make a GET request to the project's backend.",
						"Used Express to increase the security of our project by serving our files statically.",
						"Created a GET request to an external API using the fetch keyword and placed the results on the screen using the .innerText property",
						"None of the above"
					],
					correctAnswerIndex: 0
				}
			]	
		},
		{
			lessonName: 'Passing Data',
			lessonDescription: "Learn how to pass data between your frontend and your backend.", 
			exerciseDescription: "Modify app.js AND /public/script.js while following the comments in these two files as closely as possible, since they describe every step you need to take. The sandbox might display a 502 error until you successfully create your express application. On this assignment, YOU WILL NEED TO OPEN THE SANDBOX IN THE BROWSER, SIGN INTO YOUR CODESANDBOX ACCOUNT AND FORK THE REPO.",
			submissionDescription: "Paste the entire contents of app.js and /public/script.js that you wrote in the above sandbox into the textarea below. You have unlimited submissions, and only your latest submission will be recorded.",
			introVideoUrl: "https://player.vimeo.com/video/719243038?h=3a124dac14&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			codeSandBoxUrl: "https://codesandbox.io/embed/apis-03-passing-data-sdhs8j?codemirror=1&fontsize=14&hidenavigation=1&theme=dark",
			answerVideoUrl: "https://player.vimeo.com/video/720403351?h=78c788cc3d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			quiz: [
				{
					question: 'Which of the following lines of code makes a GET request to the "/hello" path and includes two parameters called firstName and lastName in the request query?',
					answerChoices: [
						"fetch(/hello/firstName=Cannon/lastName=Wilson)",
						"fetch('/hello&firstName=Cannon&lastName=Wilson')",
						"fetch('/hello?firstName=Cannon&lastName=Wilson')",
						"fetch('hello?firstName=Cannon?lastName=Wilson')"
					],
					correctAnswerIndex: 2
				},
				{
					question: 'Given two existing JavaScript variables, phone and email, which of the following lines of code makes a GET request to the "/signup" path and correctly assigns the userPhone and userEmail request query parameters to the values of the two variables?',
					answerChoices: [
						"fetch(`/signup${phone}=userPhone${email}=userEmail`)",
						"fetch(`/signup&userPhone={phone}&userEmail={email}`)",
						"fetch(`/signup?email={userEmail}&phone={userPhone}`)",
						"fetch(`/signup?userPhone=${phone}&userEmail=${email}`)"
					],
					correctAnswerIndex: 3
				},
				{
					question: 'Given a GET request made to the URL "/getData?data=python", which of the following lines of code on the backend correctly creates a new JavaScript variable and assigns it based on the data request query parameter?',
					answerChoices: [
						"const userData = req.query.data",
						"const userData = req.body.python",
						"const userData = req.params.data",
						"const userData = req.query.python",,
					],
					correctAnswerIndex: 0
				},
				{
					question: 'Which of the following HTML forms will create an HTTP POST request with a body of {"first": "Bilbo", "last": "Baggins"} when the user types Bilbo into the first field and Baggins into the second before clicking on the submit button?',
					answerChoices: [
						`<form action="/newUser" method="POST">
	<input id="first" placeholder="first" />
	<input id="last" placeholder="last" />
	<button>Submit</button>
</form>`,
						`<form action="/newUser" method="POST">
	<input src="first" placeholder="first" />
	<input src="last" placeholder="last" />
	<button>Submit</button>
</form>`,
						`<form action="/newUser" method="POST">
	<input name="first" placeholder="first" />
	<input name="last" placeholder="last" />
	<button>Submit</button>
</form>`,
						`<form action="/newUser" method="POST">
	<input id="Bilbo" placeholder="first" />
	<input id="Baggins" placeholder="last" />
	<button>Submit</button>
</form>`,
					],
					correctAnswerIndex: 2
				},
				{
					question: 'The HTTP request body on the backend will be undefined unless you include which of the following lines of code?',
					answerChoices: [
						"app.use(express.urlencoded({extended: true}))",
						"app.use(express.json())",
						"app.use(express.static('req.body'))",
						"app.use(express.router())",
					],
					correctAnswerIndex: 0
				},
				{
					question: 'By default, an HTML form with an action attribute of "/postData" and a method of "POST" once submitted will: ',
					answerChoices: [
						"Attempt to send the user to the /postData path",
						"Create an HTTP POST request to the /postData path",
						"Will be reset if the user is redirected back to their current page by the backend",
						"All of the above",
					],
					correctAnswerIndex: 3
				},
				{
					question: 'Which of the following code snippets creates a valid POST request to "/signup"?',
					answerChoices: [
						"fetch('/signup')",
						`const options = {
	method: "POST",
	header: "JSON",
	body: JSON.stringify({id: 0, name: 'Bob'})
}
fetch('/signup', options)`,
						`const data = {id: 0, name: 'Bob'}
const options = {
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify(data)
}
fetch('/signup', options)`,
						`const options = {
	method: "POST",
	headers: {
		"Content-Type": "json"
	},
	body: JSON.stringify({id: 0, name: 'Bob'})
}`,
					],
					correctAnswerIndex: 2
				},
				{
					question: 'If you include JSON data in the request body when making a POST request and have the same content type specified in the HTTP header, which of the following lines of code must you include on the backend?',
					answerChoices: [
						"app.use(express.router())",
						"app.use(express.json())",
						"app.use(express.static('req.body'))",
						"app.use(express.urlencoded({extended: true}))",
					],
					correctAnswerIndex: 1
				},
				{
					question: 'Which of the following is true: ',
					answerChoices: [
						"HTTP status codes between 200-299 signify a failed operation",
						"HTTP responses have a .ok attribute that signify if the operation was successful",
						"MDN does not have documentation for HTTP status codes",
						"None of the above are true",
					],
					correctAnswerIndex: 1
				}
			]	
		}
	]
}