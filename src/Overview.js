import {useState, useEffect} from 'react'

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
	
	useEffect( () => {
		
		async function retrieveUserProgress() {
			
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
			<div className="accordian">
				
				{progressArray.map(module => {
					<Module />
				})}
				
			</div>
		</>
	)
}