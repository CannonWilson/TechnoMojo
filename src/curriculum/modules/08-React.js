module.exports = {
	moduleName: '08 - React',
	lessons: [
		{
			lessonName: 'Intro to React',
			lessonDescription: "Learn how to use React components to make your code clean and organized", 
			exerciseDescription: "Create a new component called Hello inside Hello.js. The component should return the text 'Hello my name is <your name here>' inside of an <h2> tag. Export your Hello component and include it inside the App component.",
			submissionDescription: "Paste the entire contents of App.js AND Hello.js that you wrote in the above sandbox into the textarea below. Please include some whitespace between your text for the different files. You have unlimited submissions, and only your latest submission will be recorded.",
			introVideoUrl: "https://player.vimeo.com/video/727905297?h=5c8122eb5b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			codeSandBoxUrl: "https://codesandbox.io/embed/01-intro-to-react-ylxz8z?fontsize=14&hidenavigation=1&theme=dark",
			answerVideoUrl: "https://player.vimeo.com/video/727905343?h=cc8e88d2bb&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			quiz: [
				{
					question: 'What is a reusable bit of code that returns React elements?',
					answerChoices: [
						"Root",
						"Class",
						"View",
						"Component"
					],
					correctAnswerIndex: 3
				},
				{
					question: 'Which is the correct command to create a new React app called my-app?',
					answerChoices: [
						"npx create react app my-app",
						"npm install react",
						"npx create-react-app my-app",
						"npm create react app my-app"
					],
					correctAnswerIndex: 2
				},
				{
					question: 'Which is the correct command to start the React local development server?',
					answerChoices: [
						"npm run build",
						"npm start",
						"npm server",
						"npx build"
					],
					correctAnswerIndex: 1
				},
				{
					question: 'Which of the following exports a valid React component?',
					answerChoices: [
						`export App() {
	return (
		<div>
			<h3>Hi</h3>
		</div>
	)	
}`,
						`default App() {
	return (
		<div>
			<h3>Hi</h3>
		</div>
	)	
}`,
						`export default function App() {
	return (
		<div>
			<h3>Hi</h3>
		</div>
	)	
}`,
						`export default function App() {
	return (
		<div>
			<h3>Hi</h3>
		</div>
		<div>
			<h3>Hello</h3>
		</div>
	)	
}`
					],
					correctAnswerIndex: 2
				}
			]	
		},
		{
			lessonName: 'Props',
			lessonDescription: "Learn how to pass data from one component down to another", 
			exerciseDescription: "Use what you just learned about props to modify App.js and Artist.js to show the artist's first name on the screen.",
			submissionDescription: "Paste the entire contents of App.js AND Artist.js that you wrote in the above sandbox into the textarea below. Please include some whitespace between your text for the different files. You have unlimited submissions, and only your latest submission will be recorded.",
			introVideoUrl: "https://player.vimeo.com/video/727905365?h=ac2f3fb632&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			codeSandBoxUrl: "https://codesandbox.io/embed/react-02-props-k5xzuk?fontsize=14&hidenavigation=1&theme=dark",
			answerVideoUrl: "https://player.vimeo.com/video/727905386?h=b41bec6873&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			quiz: [
				{
					question: 'Which of the following set of terms is used to describe the hierarchy of components inside React?',
					answerChoices: [
						"Root - leaf",
						"Parent - child",
						"Ancestor - descendant",
						"Seed - fruit"
					],
					correctAnswerIndex: 1
				},
				{
					question: 'Which of the following code snippets passes down the value stored inside the name variable to the User component through the prop called username?',
					answerChoices: [
						"<User username={name} />",
						"<User username='name' />",
						"<User username=[name] />",
						"<User {username}=name />"
					],
					correctAnswerIndex: 0
				},
				{
					question: 'Which of the following components correctly accepts two props and shows their values?',
					answerChoices: [
						`export default function MyComponent() {
	return <div>{prop1, prop2}</div>					
}`,
						`export default function MyComponent(prop1, prop2) {
	return <div>{prop1} {prop2}</div>					
}`,
						`export default function MyComponent({prop1}, prop2) {
	return <div>[prop1], prop2</div>					
}`,
						`export default function MyComponent({prop1, prop2}) {
	return <div>{prop1} {prop2}</div>					
}`
					],
					correctAnswerIndex: 3
				}
			]	
		},
		{
			lessonName: 'useState',
			lessonDescription: "This React hook helps us manage our data and update it all across our application", 
			exerciseDescription: "Edit App.js to create a new state variable that gets increased by one whenever the button is clicked.",
			submissionDescription: "Paste the entire contents of App.js that you wrote in the above sandbox into the textarea below. You have unlimited submissions, and only your latest submission will be recorded.",
			introVideoUrl: "https://player.vimeo.com/video/727905410?h=cc4ee2fd26&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			codeSandBoxUrl: "https://codesandbox.io/embed/react-03-usestate-cbz9si?fontsize=14&hidenavigation=1&theme=dark",
			answerVideoUrl: "https://player.vimeo.com/video/727905436?h=302096b1f5&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			quiz: [
				{
					question: 'Which of the following is true?',
					answerChoices: [
						"State variables can be created outside of a component",
						"React state variables can only be integers",
						"Normal JavaScript variables automatically update the DOM when they are changed",
						"The React useState hook handles updates and rerendering"
					],
					correctAnswerIndex: 3
				},
				{
					question: 'Which of the following code snippets creates a new state variable called myNumber with a default value of 100?',
					answerChoices: [
						"const myNumber = useState(100)",
						"const [myNumber, setMyNumber] = useState(0)",
						"const [myNumber] = useState(0)",
						"const [myNumber, setMyNumber] = useState(100)"
					],
					correctAnswerIndex: 3
				},
				{
					question: 'Which of the following is the correct way to create a state variable called name and update the value to "Cannon"?',
					answerChoices: [
						`let name = ''
name='Cannon'`,
						`const [name, setName] = useState('')
setName('Cannon')`,
						`const [name, setName] = useState('')
name='Cannon'`,
						`const [name, setName] = useState('')
setName='Cannon'`
					],
					correctAnswerIndex: 1
				},
				{
					question: 'The useState function is: ',
					answerChoices: [
						"Asynchronous",
						"Synchronous",
						"Declarative",
						"Imperative"
					],
					correctAnswerIndex: 0
				}
			]	
		},
		{
			lessonName: 'useEffect',
			lessonDescription: "Run code selectively based on the component's lifecycle and on values changing", 
			exerciseDescription: "Modify CounterDisplay.js to use a useEffect hook. This hook should monitor num1 and num2 for changes and set the result message to describe which number/counter is larger.",
			submissionDescription: "Paste the entire contents of CounterDisplay.js that you wrote in the above sandbox into the textarea below. You have unlimited submissions, and only your latest submission will be recorded.",
			introVideoUrl: "https://player.vimeo.com/video/727905461?h=90464428f9&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			codeSandBoxUrl: "https://codesandbox.io/embed/react-04-useeffect-0lt3ud?fontsize=14&hidenavigation=1&theme=dark",
			answerVideoUrl: "https://player.vimeo.com/video/727905491?h=4903adb535&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			quiz: [
				{
					question: 'Which of the following describes why we would want to use the useEffect hook?',
					answerChoices: [
						"The hook lets us run a function whenever specific values change",
						"We don't always want code to run every time the component re-renders",
						"We can use the hook to change specific markup elements once our component finishes rendering/re-rendering",
						"All of the above"
					],
					correctAnswerIndex: 3
				},
				{
					question: 'Which of the following lines of code successfully imports the useEffect function?',
					answerChoices: [
						"import useEffect from 'react'",
						"import {useState, useEffect} from 'react'",
						"require('useEffect')",
						"import [useState] from 'react'"
					],
					correctAnswerIndex: 1
				},
				{
					question: 'With default React settings, when a state variable updates: ',
					answerChoices: [
						"Only the component containing that state variable re-renders",
						"No components re-render",
						"The component containing that state variable re-renders as well any component contained in that component",
						"None of the above"
					],
					correctAnswerIndex: 2
				},
				{
					question: 'Suppose that the following lines of code are written inside a component. Which code will console.log "Hello" to the screen only when the component renders and not when it re-renders? ',
					answerChoices: [
						`useEffect( () => {
	console.log('Hello')
} )`,
						`useEffect( () => {
	console.log('Hello')
}, [] )`,
						"console.log('Hello')",
						"None of the above"
					],
					correctAnswerIndex: 1
				},
				{
					question: 'Which of the following is true about the second argument supplied to the useEffect function?',
					answerChoices: [
						"It is a JavaScript Map object that stores only primitive values such as strings or integers",
						"It is a function that will get called by the useEffect hook",
						"It is an array of dependencies that will trigger the function supplied in the first argument when any dependency changes",
						"If no data is supplied to the second argument, the useEffect function will only run when the component first renders"
					],
					correctAnswerIndex: 2
				}
			]	
		},
		{
			lessonName: 'React Router',
			lessonDescription: "Learn how to give your single page applications multiple views that your user can navigate between", 
			exerciseDescription: "Modify App.js to use the routing features provided by react-router-dom so your user can move between the different views already created in the /src/views folder inside the project. Show the NotFound view whenever the user attempts to access an invalid path.",
			submissionDescription: "Paste the entire contents of App.js that you wrote in the above sandbox into the textarea below. You have unlimited submissions, and only your latest submission will be recorded.",
			introVideoUrl: "https://player.vimeo.com/video/727905522?h=29be6a8841&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			codeSandBoxUrl: "https://codesandbox.io/embed/react-05-routing-i9io4q?fontsize=14&hidenavigation=1&theme=dark",
			answerVideoUrl: "https://player.vimeo.com/video/727905550?h=f467cd17ac&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
			quiz: [
				{
					question: 'Which of the following commands do you need to run before you can work with React Router in your web app?',
					answerChoices: [
						"npm install react-router-native",
						"npx install react router dom",
						"npm install react-router-dom",
						"npx install react router native"
					],
					correctAnswerIndex: 2
				},
				{
					question: 'Which of the following code snippets correctly imports all of the components you need to give your web app multiple views?',
					answerChoices: [
						"import {Router, Routes, Route} from 'react-router-dom'",
						"import {BrowserRouter, Routes, Route} from 'react-router-dom'",
						"import Router, {Routes, Route} from 'react-router-native'",
						"import Router, Routes, Route from 'react-router-dom",
					],
					correctAnswerIndex: 1
				},
				{
					question: 'Which of the following App components lets the user switch between different views and shows a component called NotFound when the user attempts to access an invalid path?',
					answerChoices: [
						`export default function App() {
	return (
		<Routes>
			<Route to="/" element={NotFound} />
		</Routes>	
	)
}`,
						`export default function App() {
	return (
		<BrowserRouter>
			<Route to="/" element={Home} />
			<Route to="/about" element={About} />
			<Route to="*" element={NotFound} />
		</BrowserRouter>	
	)
}`,
						`export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route to="/" element={ <Home/> } />
				<Route to="/about" element={ <About/> } />
				<Route to="*" element={ <NotFound/> } />
			</Routes>
		</BrowserRouter>	
	)
}`,
						`export default function App() {
	return (
		<BrowserRouter>
			<Route to="/" element={Home} />
			<Route to="/about" element={About} />
			<Route to="*" element={NotFound} />
		</BrowserRouter>	
	)
}`
					],
					correctAnswerIndex: 2
				}
			]	
		}
	]
}