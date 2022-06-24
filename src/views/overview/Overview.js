import {useState, useEffect} from 'react'
import Module from './Module.js'
import './Overview.css'
import Header from '../../shared/Header.js'
const lessonPlan = require('../../curriculum/lessonPlan.js')

export default function Overview() {
	
	/* Each user will have a corresponding document in 
	the database. The document will have their username
	and password, as well as an array called progress.
	The progress array has objects as items like this:
	progressArray = [
		{
		  moduleName: '01 - HTML & CSS',
		  lessonName: 'Basic HTML',
		  userCode: 'import%20%22.%2Fstyles.css%22%3B%0A%0Aexport%20default%20function%20App()%20%7B%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%20className%3D%22App%22%3E%0A%20%20%20%20%20%20%3Ch1%3EHello%20CodeSandbox%3C%2Fh1%3E%0A%20%20%20%20%20%20%3Ch2%3EStart%20editing%20to%20see%20some%20magic%20happen!%3C%2Fh2%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%0A'
		},
		{
		  moduleName: '01 - HTML & CSS',
		  lessonName: 'Intro to CSS',
		  userCode: 'import%20%22.%2Fstyles.css%22%3B%0A%0Aexport%20default%20function%20App()%20%7B%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%20className%3D%22App%22%3E%0A%20%20%20%20%20%20%3Ch1%3EHello%20CodeSandbox%3C%2Fh1%3E%0A%20%20%20%20%20%20%3Ch2%3EStart%20editing%20to%20see%20some%20magic%20happen!%3C%2Fh2%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%0A'
		},
	]
	*/
	const [progressArray, setProgressArray] = useState([])
	
	// use useEffect to get user progress from the backend when the view loads
	useEffect( () => {
		
		async function retrieveUserProgress() {
			try {
				const username = localStorage.getItem('username')
				const response = await fetch('http://localhost:4000/api/userProgress?username='+username)
				const json = await response.json()
				console.log('json progressarray', json)
				setProgressArray(json)
			}
			catch(err) { // above code will fail if the localStorage fails to get the user's username or if the database fails to find the user
				
				document.getElementById('retrieveUserProgressError').textContent = "There was a verification error. Please return to the sign in page and enter your information again. Local storage is used to store your username, so this page will not work if you are in a private window or if you have cleared this website's data."
				console.error(err)
			}
		}
		
		retrieveUserProgress()
		
	}, [])
	
	const [completionPercent, setCompletionPercent] = useState("")
	
	useEffect(() => {
		if (progressArray) { // if the progressArray has been received from the backend, calculate completion % so far
			
			let lessonCount = 0
			lessonPlan.forEach(module => lessonCount += module.lessons.length)
			let completedLessonCount = progressArray.length
			setCompletionPercent(String(Math.round(100 * completedLessonCount / lessonCount)))
			
		}
	}, [progressArray])
		
	
	return (
		<>
			<Header leftText="← Back to sign in" rightText="" leftLink="/" rightLink="/"/>
			
			<div className="overviewPageWrapper">
				<p className="overviewCompletion">Overall completion: {completionPercent}%</p>
				<p id="retrieveUserProgressError"></p>
				<div className="accordian">
					
					{lessonPlan.map(module => 
						<Module module={module} key={module.moduleName} progressArrayForThisModule={progressArray.filter(doc => doc.moduleName === module.moduleName)} />
					)}
					
				</div>
			</div>
		</>
	)
}