import {useState, useEffect} from 'react'
import './AdminStudentCard.css'
import Module from '../shared/Module.js'


export default function AdminStudentCard({lessonPlan, username}) {
		
	const [overallCompletion, setOverallCompletion] = useState(0)
	const [showingModal, setShowingModal] = useState(false)
	
	
	/* After the below useEffect call, the moduleProgress array 
	for the logged in student will look like this: 
	[
		{
			moduleName: 'HTML',
			lessons: [
				{
					lessonName: 'Basic HTML',
					submittedCode: ''
				},
				{
					lessonName: 'Intro to CSS', 
					submittedCode: ''
				},
				. . . 
			],
			completionPercent: 0
		},
		. . . more modules
	]
	*/
	const [moduleProgress, setModuleProgress] = useState([])
	
	useEffect(() => {
		let totalLessons = 0
		let completedLessons = 0
		
		for (const [moduleIndex, module]  of lessonPlan.entries()) {
			
			moduleProgress.push({moduleName: module.moduleName, lessons: [], completionPercent: 0})
			
			for (const lesson of module.lessons) {
				totalLessons++
				const foundCompletedLesson = lesson.studentProgress.find(usernameAndCode => usernameAndCode.username === username && usernameAndCode.submittedCode !== "")
				if (foundCompletedLesson) {
					completedLessons++
					moduleProgress[moduleIndex].lessons.push({lessonName: lesson.lessonName, submittedCode: foundCompletedLesson.submittedCode})	
				}
				else moduleProgress[moduleIndex].lessons.push({lessonName: lesson.lessonName, submittedCode: ""}) 
			}
			
			const finishedLessonsInModule = moduleProgress[moduleIndex].lessons.filter(lesson => lesson.submittedCode !== "").length
			const totalLessonsInModule = module.lessons.length
			
			moduleProgress[moduleIndex].completionPercent = Math.round(100 * finishedLessonsInModule / totalLessonsInModule)
			
		}
		
		setOverallCompletion(Math.round(100*(completedLessons/totalLessons)))
		
	}, [])
	
	
	return (
		<div className="admin-card">
				
			{/* Start card header */}
			<div className="admin-card-header" onClick={() => setShowingModal(true)}> 
				{username} - {overallCompletion}%
			</div>
			{/* End card header */}
			
			
			{/* Start modal (black background) */}
			{showingModal && <div className="admin-modal" onClick={() => setShowingModal(false)}>
				
				
				{/* Stopping the propagation of the event is necessary here.
				Otherwise, the modal could be closed by clicking anywhere inside 
				its content */}
				{/* Start modal content*/}
				<div className="admin-modal-content" onClick={(event) => event.stopPropagation()} >
				
				
					{/* Start modal header section */}
					<div className="admin-modal-header">
					
						<div className="admin-modal-close">
							<button className="admin-modal-close-btn" onClick={() => setShowingModal(false)}>X</button>
						</div>
						
						<div className="admin-modal-user-info">
							<h2 className="admin-modal-username">{username}</h2>
							<h4 className="admin-modal-completion">Overall completion: {overallCompletion}%</h4>
						</div>
						
					</div>
					{/* End modal header section */}
					
					
					{/* Start accordian */}
					<div className="accordian">
						{moduleProgress.map(module => 
							<Module from="adminModal" module={module} key={module.moduleName} />
						)}
					</div>
					{/* End accordian */}
					
				</div>
				{/* End modal content*/}
				
			</div>}
			{/* End modal (black background) */}
			
		</div>
	)
}