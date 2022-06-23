import {useState, useEffect} from 'react'
import AdminUserBlock from './AdminUserBlock.js'
import './AdminLessonSummary.css'

export default function AdminStudentSummary({module}) {
	
		
	const finishedLessons = module.lessons.filter(lesson => lesson.submittedCode !== "")
	const unfinishedLessons = module.lessons.filter(lesson => lesson.submittedCode === "")

		
	return (
		<>

					<div>
						<p><b>Finished:</b> {finishedLessons.map(lesson => 
							<span className="adminStudents" key={lesson.lessonName}>{lesson.lessonName}</span>)}
						</p>
						<div className="studentSummaryFlex">
							{finishedLessons.map(lesson => 
								<AdminUserBlock headerText={lesson.lessonName} code={lesson.submittedCode} key={lesson.lessonName} />
							)}
						</div>
						
						<p><b>Unfinished:</b> {unfinishedLessons.map(lesson => 
							<span className="adminStudents" key={lesson.lessonName}>{lesson.lessonName}</span>)}
						</p>
					</div>


		</>
	)
}