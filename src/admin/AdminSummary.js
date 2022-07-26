/* This component shows either all students' progress 
for a given lesson in the main admin accordian 
(from = 'admin') or one student's progress for 
every lesson in a module in the modal that appears
after clicking on an AdminStudentCard 
(from = 'adminModal') */

/* The finished/unfinished arrays will either hold all of the entries
in the studentProgress array for the current lesson
(from = 'admin') or all of the lessons in a module 
for one student (from = 'adminModal') */


import AdminUserBlock from './AdminUserBlock.js'
import {useState, useEffect} from 'react'
import './AdminSummary.css'


function LessonSummary({lesson}) { // shown if from = 'admin'
	
	const [isActive, setIsActive] = useState(false)
	const [finished, setFinished] = useState([])
	const [unfinished, setUnfinished] = useState([])
	
	useEffect(() => {
		
		if (lesson.studentProgress) {
			setFinished(lesson.studentProgress.filter(usernameAndCode => usernameAndCode.submittedCode !== ""))
			setUnfinished(lesson.studentProgress.filter(usernameAndCode => usernameAndCode.submittedCode === ""))
		}
		
	}, [lesson.studentProgress])
	
	
	return (
		<div>
		
			{/* Start lesson btn */}
			<button onClick={() => setIsActive(!isActive)} className="summary-lesson-name-btn">
				{lesson.lessonName} | {finished && finished.length} submitted
			</button>
			{/* End lesson btn */}
			
			{/* Start student progress summary section for lesson */}
			{isActive && lesson.studentProgress &&   
				<div>
				
					{/* Start finished students' names */}
					<p className="admin-text-list">
						<b>Finished:</b> 
						{finished.map(usernameAndCode => 
							<span className="admin-text" key={usernameAndCode.username}>
								{usernameAndCode.username}
							</span>
						)}
					</p>
					{/* End finished students' names */}
					
					
					{/* Start finished students' code */}
					<div className="student-summary-flex">
						{finished.map(usernameAndCode => {
							if (usernameAndCode.submittedCode) {
								return <AdminUserBlock headerText={usernameAndCode.username} code={usernameAndCode.submittedCode} key={usernameAndCode.username} />
							}
							return null
						})}
					</div>
					{/* End finished students' code */}
					
					
					{/* Start unfinished students' names */}
					<p className="admin-text-list">
						<b>Unfinished:</b> 
						{unfinished.map(usernameAndCode => 
							<span className="admin-text" key={usernameAndCode.username}>
								{usernameAndCode.username}
							</span>
						)}
					</p>
					{/* End unfinished students' names */}
					
				</div>
			}
			{/* End student progress summary section for lesson */}
			
		</div>
	)

}


function StudentSummary({module}) { // shown if from = 'adminModule'
	
	const finished = module.lessons.filter(lesson => lesson.submittedCode !== "")
	const unfinished = module.lessons.filter(lesson => lesson.submittedCode === "")

	return (
		<div>
		
			{/* Start finished students' names */}
			<p className="admin-text-list">
				<b>Finished:</b> 
				{finished.map(lesson => 
					<span className="admin-text" key={lesson.lessonName}>
						{lesson.lessonName}
					</span>
				)}
			</p>
			{/* End finished students' names */}
			
			
			{/* Start finished students' code */}
			<div className="student-summary-flex">
				{finished.map(lesson => 
					<AdminUserBlock headerText={lesson.lessonName} code={lesson.submittedCode} key={lesson.lessonName} />
				)}
			</div>
			{/* End finished students' code */}
			
			
			{/* Start unfinished students' names */}
			<p className="admin-text-list">
				<b>Unfinished:</b> 
				{unfinished.map(lesson => 
					<span className="admin-text" key={lesson.lessonName}>
						{lesson.lessonName}
					</span>
				)}
			</p>
			{/* End unfinished students' names */}
			
		</div>
	)
}





export default function AdminSummary({module, lesson, from}) {
		
	if (from === "admin") return <LessonSummary lesson={lesson} />
	if (from === "adminModal") return <StudentSummary module={module} />	
	return null
	
}