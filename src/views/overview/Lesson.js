import {Link} from 'react-router-dom'
import './Lesson.css'

export default function Lesson({lesson, lessonIndex, moduleName, completed}) {
	return (
		<div className="lessonWrapper">
			<Link className="lessonLink" to={`/lecture?moduleName=${encodeURIComponent(moduleName)}&lessonName=${encodeURIComponent(lesson.lessonName)}`}>
				<div className={completed ? "lessonCircle completed" : "lessonCircle"}>
					{lessonIndex + 1}
				</div>
				<p className="lessonName">{lesson.lessonName}</p>
			</Link>
		</div>
	)
}