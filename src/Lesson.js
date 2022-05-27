import './Lesson.css'

export default function Lesson({lesson, lessonIndex}) {
	return (
		<>
			<div className="lessonWrapper">
				<div className="lessonCircle">
					<p>{lessonIndex}</p>
				</div>
				<p>{lesson.lessonName}</p>
			</div>
		</>
	)
}