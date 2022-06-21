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
					<p className="moduleName">{module.moduleName}</p>
					<div className="modulePlusMinus">{moduleActive ? "-" : "+"}</div>
				</div>
				{moduleActive ? <div className="moduleContentWrapper">
					<div className="moduleContent">
					
						{module.lessons.map(lesson => 
							<AdminLessonSummary lesson={lesson} key={lesson.lessonName} />
						)}
						
					</div>
				</div> : null}
			</div>
		</>
	)
}