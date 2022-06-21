import {useState, useEffect} from 'react'
import AdminUserBlock from './AdminUserBlock.js'
import './AdminLessonSummary.css'

export default function AdminLessonSummary({lesson}) {
	
	const [isActive, setIsActive] = useState(false)
	
	function summaryButtonClicked() {
		setIsActive(!isActive)
	}

	const finishedStudentsAndCode = lesson.studentProgress.filter(usernameAndCode => usernameAndCode.submittedCode !== "")
	const unfinishedStudents = lesson.studentProgress.filter(usernameAndCode => usernameAndCode.submittedCode === "")
	
	return (
		<>
			<div className="summaryWrapper">
				<button onClick={summaryButtonClicked} className="summaryLessonNameBtn">{lesson.lessonName} | {finishedStudentsAndCode.length} submitted</button>
				
				
				{isActive && lesson.studentProgress ? 
					<div>
						<p><b>Finished:</b> {finishedStudentsAndCode.map(usernameAndCode => 
							<span className="adminStudents" key={usernameAndCode.username}>{usernameAndCode.username}</span>)}
						</p>
						<div className="studentSummaryFlex">
							{finishedStudentsAndCode.map((usernameAndCode) => {
								if (usernameAndCode.submittedCode) {
									return <AdminUserBlock username={usernameAndCode.username} code={usernameAndCode.submittedCode} key={usernameAndCode.username} />
								}
							})}
						</div>
						
						<p><b>Unfinished:</b> {unfinishedStudents.map(usernameAndCode => 
							<span className="adminStudents" key={usernameAndCode.username}>{usernameAndCode.username}</span>)}
						</p>
					</div>
				: null}
				
			</div>
		</>
	)
}