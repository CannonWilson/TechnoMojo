import {useState} from 'react'
import Lesson from './Lesson.js'
import './Module.css'

export default function Module({module, progressArrayForThisModule}) {
	
	const [moduleActive, setModuleActive] = useState(false)
	
	function toggleModuleActive() {
		setModuleActive(!moduleActive)
	}
	
	const mountedStyle = {
	  animation: "inAnimation 400ms ease-in"
	};
	const unmountedStyle = {
	  animation: "outAnimation 400ms ease-out",
	  animationFillMode: "forwards"
	};
	
	function LessonNamesInModule() {
		let lessonNamesStr = ""
		for (const lesson of module.lessons) {
			lessonNamesStr += lesson.lessonName + "-"
		}
		return lessonNamesStr.slice(0, -1) // remove last dash from the end of the string
	}
	
	return (
		<>
			<div className="moduleWrapper">
				<div className="moduleTitleWrapper" onClick={toggleModuleActive} style={{backgroundColor: moduleActive ? "#efefef" : ""}}>
					<div className={moduleActive ? "plusMinusRotated modulePlusMinus" : "modulePlusMinus"}>↓</div>
					<p className="moduleName">{module.moduleName}</p>
				</div>
				{moduleActive && <div className="moduleContentWrapper" style={moduleActive ? mountedStyle : unmountedStyle}>
					<div className={"moduleContent"}>
					
						{module.lessons.map((lesson, index) => 
							<Lesson lesson={lesson} lessonIndex={index} lessonsInCurrentModule={LessonNamesInModule()} moduleName={module.moduleName} key={lesson.lessonName} completed={JSON.stringify(progressArrayForThisModule).includes(lesson.lessonName)}/>
						)}
						
					</div>
				</div>}
			</div>
		</>
	)
}