import {useState} from 'react'
import AdminUserBlock from './AdminUserBlock.js'
import './AdminLessonSummary.css'

export default function AdminLessonSummary({lesson}) {
	
	const [isActive, setIsActive] = useState(false)
	
	function summaryButtonClicked() {
		setIsActive(!isActive)
	}
	
	return (
		<>
			<div className="summaryWrapper">
				<button onClick={summaryButtonClicked} className="summaryLessonNameBtn">{lesson.lessonName} | {lesson.studentProgress ? lesson.studentProgress.length : 0} submitted</button>
				
				
				{isActive && lesson.studentProgress ? 
					<div className="studentSummaryFlex">
						{lesson.studentProgress.map((usernameAndCode) => 
							<AdminUserBlock username={usernameAndCode.username} code={usernameAndCode.submittedCode} key={usernameAndCode.username} />
						)}
					</div>
				: null}
				
			</div>
		</>
	)
}