import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Module from './Module.js'
import './Admin.css'

export default function Admin() {
	
	const [lessonPlan, setLessonPlan] = useState(require('./data/lessonPlan.js'))
	
	
	// Move the user back to the sign in page if they aren't logged in as admin
	const navigate = useNavigate()
	useEffect( () => {
		if (localStorage.getItem('username') !== process.env.REACT_APP_ADMIN_USERNAME) navigate('/')
	}, [])
	
	// want to construct an array that looks like this:
	/* array = [
		{
			moduleName: 'Intro JavaScript',
			lessons: [
				{
					lessonName: 'addEventListener',
					studentProgress: [
						{
							username: 'KincannonW',
							submittedCode: '<div>Hi</div>',
						},
						{
							username: 'IsabelleJ',
							submittedCode: ''
						},
						. . . more studentProgress entries
					]
				},
				{
					lessonName: 'console.log()',
					studentProgress: [
						{
							username: 'KincannonW',
							submittedCode: 'console.log("boop")',
						},
						{
							username: 'IsabelleJ',
							submittedCode: 'console.log("yeet")'
						},
						. . . more studentProgress entries
					]
				},
				. . . more lessons
			]
		},
		. . . more modules
	]
	*/
	
	
	
	
	// start by getting all of the progress arrays and corresponding usernames from backend
	useEffect( () => {
		
		let userProgressObjArray // json is an array of objects where each object has username and progress fields
		
		async function retrieveStudentProgress() {
			
			const response = await fetch('http://localhost:4000/api/allStudentProgress')
			userProgressObjArray = await response.json() 
			modifyLessonPlanToIncludeStudentProgress()
		}

		retrieveStudentProgress()
		
		
		/* Next, modify the lessonPlan array to include student progress. This
		approach is taken because the lessonPlan array serves as the
		'single source of truth' for all information about the curriculum. */
		
		/* Start by loop through all modules and the lesson array for each module, 
		deleting the fields which we don't need from the lesson array. The following
		array can be modified based on which fields will not be shown to the admin
		user on the UI. */
		function modifyLessonPlanToIncludeStudentProgress() {
			const fieldsToDelete = ['lessonDescription', 'exerciseDescription', 'submissionDescription', 'introVideoUrl', 'codeSandBoxUrl', 'answerVideoUrl', 'quiz']
			
			for (const module of lessonPlan) {
				for (const lesson of module.lessons) {
					
					for (const field of fieldsToDelete) delete lesson[field]
					
					/* Add all of the usernames and submitted code to a new
					array inside of the lesson if that user has finished 
					the given lesson */
					for (const userProgressObj of userProgressObjArray) {
						const found = userProgressObj.progress.find(item => item.lessonName === lesson.lessonName)
						if (found) {
							const usernameAndCodeForFinishedUser = {
								username: userProgressObj.username,
								submittedCode: found.userCode
							}
							if (lesson['studentProgress']) {
								lesson['studentProgress'].push(usernameAndCodeForFinishedUser)
							}
							else {
								lesson['studentProgress'] = [usernameAndCodeForFinishedUser]
							}
						}
					}
				}
			}
		}
		
	}, [] ) 

	
	
	
	
	return(
		<>
			<div className="adminPageWrapper">
				<div className="accordian">
					{lessonPlan.map(module => 
						<Module module={module} clearance="admin" key={module.moduleName}/>
					)}
				</div>
			</div>
		</>
	)
}