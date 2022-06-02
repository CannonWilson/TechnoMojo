import {Link} from 'react-router-dom'
import './Lesson.css'

export default function Lesson({lesson, lessonIndex, moduleName, completed}) {
	return (
		<>
			<div className="lessonWrapper">
				<div className={completed ? "lessonCircle completed" : "lessonCircle"}>
					<p>{lessonIndex}</p>
				</div>
				<Link to={`/lecture?moduleName=${encodeURIComponent(moduleName)}&lessonName=${encodeURIComponent(lesson.lessonName)}`}>
					<p className="lessonName">{lesson.lessonName}</p>
				</Link>
			</div>
		</>
	)
}