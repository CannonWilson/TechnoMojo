import {Link} from 'react-router-dom'
import './Lesson.css'

export default function Lesson({lesson, lessonIndex, lessonsInCurrentModule, moduleName, completed}) {
	
	return (
		<div className="lesson-wrapper">
			<Link className="lesson-link" to={`/lecture?moduleName=${encodeURIComponent(moduleName)}&lessonName=${encodeURIComponent(lesson.lessonName)}&lessonsInCurrentModule=${encodeURIComponent(lessonsInCurrentModule)}`}>
				<div className={`lesson-circle ${completed ? "completed" : ""}`}>
					{lessonIndex + 1}
				</div>
				<p className="lesson-name">{lesson.lessonName}</p>
			</Link>
		</div>
	)
}