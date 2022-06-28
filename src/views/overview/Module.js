import {useState} from 'react'
import Lesson from './Lesson.js'
import './Module.css'


export default function Module({module, progressArrayForThisModule}) {
	
	const [isModuleActive, setIsModuleActive] = useState(false)
	
	
	/* The following style objects are used to control fade-in 
	and fade-out animations written in './Module.css' 
	whenever the module contents are shown/hidden */
	const mountedStyle = {
		animation: "inAnimation 400ms ease-in",
	}
	
	const unmountedStyle = {
		animation: "outAnimation 400ms ease-out",
		animationFillMode: "forwards",
	}
	
	function GetLessonNamesInModule() {
		let lessonNamesStr = ""
		for (const lesson of module.lessons) {
			lessonNamesStr += lesson.lessonName + "-"
		}
		return lessonNamesStr.slice(0, -1) // remove last dash from the end of the string
	}
	
	
	return (
		<div className="module-wrapper">
		
			{/* Begin title section */}
			<div className="module-title-wrapper" 
				onClick={() => setIsModuleActive(!isModuleActive)} ß
				style={{backgroundColor: isModuleActive ? "#efefef" : ""}}>
				
				<div className={isModuleActive ? "plus-minus-rotated module-plus-minus" : "module-plus-minus"}>↓</div>
				
				<p className="moduleName">{module.moduleName}</p>
				
			</div>
			{/* End title section */}
			
			
			
			{isModuleActive && <div className="moduleContentWrapper" style={isModuleActive ? mountedStyle : unmountedStyle}>
				<div className={"moduleContent"}>
				
					{module.lessons.map((lesson, index) => 
						<Lesson lesson={lesson} lessonIndex={index} lessonsInCurrentModule={GetLessonNamesInModule()} moduleName={module.moduleName} key={lesson.lessonName} completed={JSON.stringify(progressArrayForThisModule).includes(lesson.lessonName)}/>
					)}
					
				</div>
			</div>}
			
		</div>
	)
}