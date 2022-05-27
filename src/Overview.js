import {useState, useEffect} from 'react'
import Module from './Module.js'
import {lessonPlan} from './data/lessonPlan.js'
import './Overview.css'

export default function Overview() {
	
	/* Each user will have a corresponding document in 
	the database. The document will have their username
	and password, as well as an array called progress.
	The progress array has objects as items like this:
	progressArray = [
		{
			moduleName: '01 - HTML & CSS',
			lessons: [
				{
					lessonName: 'Basic HTML',
					completed: false,
					submittedCode: ""
				},
				{
					lessonName: 'Intro to CSS',
					completed: false,
					submittedCode: ""
				},
				. . . (more lessons)
			]
		},
		{
			moduleName: '02 - Basic Javascript',
			lessons: [
				{
					lessonName: 'Variables',
					completed: false,
					submittedCode: ""
				},
				{
					lessonName: 'Reassigning values',
					completed: false,
					submittedCode: ""
				},
				. . . (more lessons)
			]
		},
	]
	*/
	const [progressArray, setProgressArray] = useState([])
	
	// When the user clicks on a new lesson that they have not accessed before, their progress array will be updated to include the lesson by that name.
	
	useEffect( () => {
		
		async function retrieveUserProgress() {
			try {
				const username = localStorage.getItem('username')
				console.log('username from local', username)
				const response = await fetch('http://localhost:43023/api/userProgress?username='+username)
				const json = await response.json()
				setProgressArray(json)
			}
			catch(err) { // above code will fail if the localStorage fails to get the user's username or if the database fails to find the user
				
				document.getElementById('retrieveUserProgressError').textContent = "There was a verification error. Please return to the sign in page and enter your information again. Cookies are used to store your username, so this page will not work if you are in a private window or if you have cleared this website's cookies."
				console.error(err)
			}
		}
		
		retrieveUserProgress()
		
	}, [])
	
	// use useEffect to get user progress from the backend
	// then, pass the respective parts of the progress array down
	// to the accordian items
	// each accordian item will be a component that renders the
	// correct lessons and the user's progress in the module
	
	return (
		<>
			<div className="overviewPageWrapper">
				<p id="retrieveUserProgressError"></p>
				<div className="accordian">
					
					{lessonPlan.map(module => 
						<Module module={module} key={module.moduleName}/>
					)}
					
				</div>
			</div>
		</>
	)
}