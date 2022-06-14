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
					question: 'The first question: ',
					answerChoices: [
						"First answer choice",
						"Second answer choice",
						"Third answer choice",
						"Fourth answer choice"
					],
					correctAnswerIndex: 0
				},
				{
					question: 'The second question: ',
					answerChoices: [
						"First answer choice",
						"Second answer choice",
						"Third answer choice",
						"Fourth answer choice"
					],
					correctAnswerIndex: 0
				},
				{
					question: 'The third question: ',
					answerChoices: [
						"First answer choice",
						"Second answer choice",
						"Third answer choice",
						"Fourth answer choice"
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
					question: 'The first question: ',
					answerChoices: [
						"First answer choice",
						"Second answer choice",
						"Third answer choice",
						"Fourth answer choice"
					],
					correctAnswerIndex: 0
				},
				{
					question: 'The second question: ',
					answerChoices: [
						"First answer choice",
						"Second answer choice",
						"Third answer choice",
						"Fourth answer choice"
					],
					correctAnswerIndex: 0
				},
				{
					question: 'The third question: ',
					answerChoices: [
						"First answer choice",
						"Second answer choice",
						"Third answer choice",
						"Fourth answer choice"
					],
					correctAnswerIndex: 0
				}
			]	
		}
	]
}