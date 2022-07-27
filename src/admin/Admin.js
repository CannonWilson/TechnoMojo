/* This is the structure of the components
in the admin portion of the site: 

Admin
  |
  |- Module (inside main accordian, from="admin")
  |    |
  |    |- AdminSummary - LessonSummary (from="admin" shows student progress for each 
  |	                           |        lesson when module is active)
  |                            |
  |                            |- AdminUserBlock
  |
  |- AdminStudentCard (student names at the bottom of Admin page, 
	        |          contains a modal that shows modules when clicked)
			|
            |- Module (from="adminModal")
			     |
			     |- AdminSummary - StudentSummary (from="adminModal" shows progress on all
					                     |        lessons in a module for one selected student)
										 |
				                         |- AdminUserBlock
*/



import Header from '../shared/Header.js'
import Module from '../shared/Module.js' 
import AdminStudentCard from './AdminStudentCard.js'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './Admin.css'

export default function Admin() {
	
	const lessonPlan = require('../curriculum/lessonPlan.js')

	// Edit the line below whenever a new cohort is added!
	const cohorts = ['2022-01', '2021']
	const [selectedCohort, setSelectedCohort] = useState(cohorts[0])
	const [refreshAfterCohortChange, setRefreshAfterCohortChange] = useState(false) // a simple toggle to forcefully rerender the modules once a different cohort has been selected.
	
	
	// Move the user back to the sign in page if they aren't logged in as admin
	const navigate = useNavigate()
	useEffect( () => {
		if (localStorage.getItem('username') !== process.env.REACT_APP_ADMIN_USERNAME) navigate('/')
	}, [navigate])

	
		
	/* The following useEffect hook starts by making a
	GET request to the backend to retrieve all of the
	progress arrays for each student in a given cohort.
	Next, the lessonPlan array is modified in place to
	include student progress and it will eventually
	look like this: 
	lessonPlan = [
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
				. . . more lessons
			]
		},
		. . . more modules
	]
	*/
	useEffect( () => {
				
		let userProgressObjArray // json is an array of objects where each object has username and progress fields
		
		async function retrieveStudentProgress() {
			
			const response = await fetch('https://technomojo.herokuapp.com/api/allStudentProgress?cohort=' + selectedCohort)
			userProgressObjArray = await response.json() 
			modifyLessonPlanToIncludeStudentProgress()
			setRefreshAfterCohortChange(!refreshAfterCohortChange) // toggle the refresh to force the modules to re-render
		}

		retrieveStudentProgress()
		

		function modifyLessonPlanToIncludeStudentProgress() {
			
			const fieldsToDelete = ['lessonDescription', 'exerciseDescription', 'submissionDescription', 'introVideoUrl', 'codeSandBoxUrl', 'answerVideoUrl', 'quiz'] // delete unnecessary fields to save memory
			
			for (const module of lessonPlan) {
				for (const lesson of module.lessons) {
					
					for (const field of fieldsToDelete) delete lesson[field]
					
					/* Clear out the studentProgress array. This is necessary to clear out 
					the array whenever the chosen cohort changes. */
					lesson['studentProgress'] = []
					
					/* Add all of the usernames and submitted code (or an 
					empty string if unfinished) to a new array inside of 
					the lesson */
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
				
	}, [selectedCohort, lessonPlan, refreshAfterCohortChange])
	
	
	return (
		<>
			
			{/* Begin Header */}
			<Header leftText="← Sign in" rightText="" leftLink="/" rightLink="#"/>
			{/* End Header */}
			
			
			{/* Begin wrapper */}
			<div className="admin-page-wrapper flex-center">
			
				{/* Begin cohort selection section */}
				<p className="cohort-select-text"> Click on the dropdown below to select a cohort: </p>
			
				<select className="admin-cohort-select" onChange={(event) => setSelectedCohort(event.target.value)} data-testid="admin-select">
					{cohorts.map(cohort => 
						<option value={cohort} key={cohort} data-testid={cohort}>{cohort}</option>
					)}
				</select>
				{/* End cohort selection section*/}
				
				
				{/* Begin accordian */}
				<div className="admin-accordian flex-center">
					{lessonPlan.map(module => 
						<Module module={module} key={module.moduleName} refresh={refreshAfterCohortChange} from="admin" />
					)}
				</div>
				{/* End accordian */}
				
				
				{/* Begin student section */}
				<div className="admin-student-section">
					{lessonPlan[0].lessons[0].studentProgress && lessonPlan[0].lessons[0].studentProgress.map(usernameAndCode => 
						<AdminStudentCard key={usernameAndCode.username} lessonPlan={lessonPlan} username={usernameAndCode.username}/>
					)}
				</div>
				{/* End student section */}
				
			</div>
			{/* End wrapper */}
		</>
	)
}