import {useState} from 'react'
import Lesson from './Lesson.js'
import './Module.css'

export default function Module({module}) {
	
	const [moduleActive, setModuleActive] = useState(false)
	
	function toggleModuleActive() {
		setModuleActive(!moduleActive)
		console.log('setModuleActive to ', moduleActive)
	}
	
	return (
		<>
			<div className="moduleWrapper" onClick={toggleModuleActive}>
				<div className="moduleTitleWrapper">
					<p>{module.moduleName}</p>
				</div>
				<div className={"moduleContent " + moduleActive ? "activeModule" : "hiddenModule"}>
				
					{/* If the module is active, show its lessons */}
					{moduleActive ? module.lessons.map(lesson => 
						<Lesson lesson={lesson} lessonIndex={module.lessons.indexOf(lesson)} key={lesson.lessonName}/>
					) : null}
					
				</div>
			</div>
		</>
	)
}