import {useState} from 'react'
import Lesson from './Lesson.js'
import AdminLessonSummary from '../../admin/AdminLessonSummary.js'
import './Module.css'

export default function Module({module, progressArrayForThisModule, clearance}) {
	
	const [moduleActive, setModuleActive] = useState(false)
	
	function toggleModuleActive() {
		setModuleActive(!moduleActive)
	}
	
	return (
		<>
			<div className="moduleWrapper">
				<div className="moduleTitleWrapper" onClick={toggleModuleActive}>
					<p>{module.moduleName}</p>
				</div>
				<div className="moduleContentWrapper">
					<div className={"moduleContent"}>
					
						{/* If the module is active and being shown to a normal user, show its corresponding Lesson components */}
						{moduleActive && clearance === "normal" ? module.lessons.map(lesson => 
							<Lesson lesson={lesson} lessonIndex={module.lessons.indexOf(lesson)} moduleName={module.moduleName} key={lesson.lessonName} completed={JSON.stringify(progressArrayForThisModule).includes(lesson.lessonName)}/>
						) : null}
						
						{/* If the module is active and being shown to an admin user, show its corresponding AdminLessonSummary components */}
						{moduleActive && clearance === "admin" ? module.lessons.map(lesson => 
							<AdminLessonSummary lesson={lesson} key={lesson.lessonName} />
						) : null}
						
					</div>
				</div>
			</div>
		</>
	)
}