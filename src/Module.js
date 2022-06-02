import {useState} from 'react'
import Lesson from './Lesson.js'
import './Module.css'

export default function Module({module, progressArrayForThisModule}) {
	
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
					
						{/* If the module is active, show its lessons */}
						{moduleActive ? module.lessons.map(lesson => 
							<Lesson lesson={lesson} lessonIndex={module.lessons.indexOf(lesson)} moduleName={module.moduleName} key={lesson.lessonName} completed={JSON.stringify(progressArrayForThisModule).includes(lesson.lessonName)}/>
						) : null}
						
					</div>
				</div>
			</div>
		</>
	)
}