import {useState, useEffect} from 'react'
import AdminUserBlock from './AdminUserBlock.js'
import './AdminLessonSummary.css'

export default function AdminLessonSummary({lesson}) {
	
	const [isActive, setIsActive] = useState(false)
	
	function summaryButtonClicked() {
		setIsActive(!isActive)
	}
	
	const [finishedStudentsAndCode, setFinishedStudentsAndCode] = useState([])
	const [unfinishedStudents, setUnfinishedStudents] = useState([])
	
	useEffect(() => {
		if (lesson.studentProgress) {
			setFinishedStudentsAndCode(lesson.studentProgress.filter(usernameAndCode => usernameAndCode.submittedCode !== ""))
			setUnfinishedStudents(lesson.studentProgress.filter(usernameAndCode => usernameAndCode.submittedCode === ""))
		}
	}, [lesson.studentProgress])
	
	return (
		<div className="summaryWrapper">
			<button onClick={summaryButtonClicked} className="summaryLessonNameBtn">{lesson.lessonName} | {finishedStudentsAndCode && finishedStudentsAndCode.length} submitted</button>
			
			
			{isActive && lesson.studentProgress ? 
				<div>
					<p><b>Finished:</b> {finishedStudentsAndCode.map(usernameAndCode => 
						<span className="adminStudents" key={usernameAndCode.username}>{usernameAndCode.username}</span>)}
					</p>
					<div className="studentSummaryFlex">
						{finishedStudentsAndCode.map((usernameAndCode) => {
							if (usernameAndCode.submittedCode) {
								return <AdminUserBlock headerText={usernameAndCode.username} code={usernameAndCode.submittedCode} key={usernameAndCode.username} />
							}
						})}
					</div>
					
					<p><b>Unfinished:</b> {unfinishedStudents.map(usernameAndCode => 
						<span className="adminStudents" key={usernameAndCode.username}>{usernameAndCode.username}</span>)}
					</p>
				</div>
			: null}
			
		</div>
	)
}