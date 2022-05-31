import {Link} from 'react-router-dom'
import './Lesson.css'

export default function Lesson({lesson, lessonIndex, moduleName}) {
	return (
		<>
			<div className="lessonWrapper">
				<div className="lessonCircle">
					<p>{lessonIndex}</p>
				</div>
				{console.log('encoded moduleName in Lesson.js: ', encodeURIComponent(moduleName))}
				{console.log('encoded lessonName in Lesson.js: ', encodeURI(lesson.lessonName))}
				<Link to={`/lecture?moduleName=${encodeURIComponent(moduleName)}&lessonName=${encodeURI(lesson.lessonName)}`}>
					<p className="lessonName">{lesson.lessonName}</p>
				</Link>
			</div>
		</>
	)
}