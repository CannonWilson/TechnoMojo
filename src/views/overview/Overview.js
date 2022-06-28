import {useState, useEffect} from 'react'
import Module from './Module.js'
import Header from '../../shared/Header.js'
import './Overview.css'
const lessonPlan = require('../../curriculum/lessonPlan.js')


export default function Overview() {
	
	/* Each user corresponds to one document in 
	the database. The document will have their username
	and password, as well as an array called progress.
	The progress array has objects as items like this:
	progressArray = [
		{
		  moduleName: '01 - HTML & CSS',
		  lessonName: 'Basic HTML',
		  userCode: 'Hello%20World'
		},
		{
		  moduleName: '01 - HTML & CSS',
		  lessonName: 'Intro to CSS',
		  userCode: 'styling'
		},
		. . . 
	]
	*/
	const [progressArray, setProgressArray] = useState([])
	
	
	/* The following code makes a GET request to the backend to 
	retrieve the progress array for the user that's currently
	signed in. */
	useEffect( () => {
		
		async function retrieveUserProgress() {
			try {
				const username = localStorage.getItem('username')
				const response = await fetch('http://localhost:4000/api/userProgress?username='+username)
				const json = await response.json()
				setProgressArray(json)
			}
			catch(err) { // above code will fail if the localStorage fails to get the user's username or if the database fails to find the user
				
				document.getElementById('retrieve-user-progress-error').textContent = "There was a verification error. Please return to the sign in page and sign in again."
				console.error(err)
			}
		}
		
		retrieveUserProgress()
		
	}, [])
	
	
	/* Once the progressArray has been filled, the following code 
	will calculate the percentage of lessons in the curriculum 
	that the user has completed. */
	const [completionPercent, setCompletionPercent] = useState("0")
	
	useEffect(() => {
		
		if (progressArray.length > 0) {
			
			let lessonCount = 0
			lessonPlan.forEach(module => lessonCount += module.lessons.length)
			let completedLessonCount = progressArray.length
			setCompletionPercent(String(Math.round(100 * completedLessonCount / lessonCount)))
		}
		
	}, [progressArray])
		
	
	return (
		<>
			
			{/* Begin header */}
			<Header leftText="← Back to sign in" rightText="" leftLink="/" rightLink="/"/>
			{/* End header */}
			
			
			{/* Begin overview wrapper */}
			<div className="flex-center">
			
				<p className="overview-completion">Overall completion: {completionPercent}%</p>
				<p id="retrieve-user-progress-error" className="default-error-msg"></p>
				
				<div className="accordian flex-center">
					
					{lessonPlan.map(module => 
						<Module module={module} key={module.moduleName} progressArrayForThisModule={progressArray.filter(doc => doc.moduleName === module.moduleName)} />
					)}
					
				</div>
				
			</div>
			{/* End overview wrapper */}
			
		</>
	)
}