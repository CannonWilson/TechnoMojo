import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Module from './Module.js'
import './Admin.css'

export default function Admin() {
	
	const [lessonPlan, setLessonPlan] = useState(require('./data/lessonPlan.js'))
	
	const cohorts = ['2021', '2022-01']
	const [selectedCohort, setSelectedCohort] = useState(cohorts[0])
	const [refreshAfterCohortChange, setRefreshAfterCohortChange] = useState(false) // a simple toggle to forcefully rerender the modules once a different cohort has been selected.
	
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
			
			const response = await fetch('http://localhost:4000/api/allStudentProgress?cohort=' + selectedCohort)
			userProgressObjArray = await response.json() 
			modifyLessonPlanToIncludeStudentProgress()
			setRefreshAfterCohortChange(!refreshAfterCohortChange) // toggle the refresh to force the modules to rerender
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
					
					/* Clear out the studentProgress array. This is necessary to clear out 
					the array whenever the chosen cohort changes. */
					lesson['studentProgress'] = []
					
					/* Add all of the usernames and submitted code to a new
					array inside of the lesson if that user has finished 
					the given lesson. If they haven't finished the
					given lesson, add an empty string for their 
					submittedCode instead */
					for (const userProgressObj of userProgressObjArray) {
						const found = userProgressObj.progress.find(item => item.lessonName === lesson.lessonName)
						let userCode = ""
						if (found) {
							userCode = found.userCode
						}
						const usernameAndCodeForFinishedUser = {
							username: userProgressObj.username,
							submittedCode: userCode
						}
						
						// Push onto the studentProgress array or create a new array for the lesson
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
				
	}, [selectedCohort] ) 
	
	
	return(
		<>
			<div className="adminPageWrapper">
			
				<p> Click on the dropdown below to select a cohort: </p>
			
				<select onChange={(event) => setSelectedCohort(event.target.value)} >
					{cohorts.map((cohort) => (
						<option value={cohort} key={cohort}>{cohort}</option>
					))}
				</select>
							
				<div className="accordian">
					{lessonPlan.map(module => 
						<Module module={module} clearance="admin" key={module.moduleName} refresh={refreshAfterCohortChange}/>
					)}
				</div>
			</div>
		</>
	)
}