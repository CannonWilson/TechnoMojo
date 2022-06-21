import {useState} from 'react'
import AdminLessonSummary from './AdminLessonSummary.js'
import './AdminModule.css'

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
					
						{moduleActive ? module.lessons.map(lesson => 
							<AdminLessonSummary lesson={lesson} key={lesson.lessonName} />
						) : null}
						
					</div>
				</div>
			</div>
		</>
	)
}