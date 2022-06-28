import {useState, useEffect} from 'react'
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
	
	const [firstLoad, setFirstLoad] = useState(true)
	
	useEffect(() => {
		
		const moduleContent = document.getElementById(module.moduleName)
		
		if (isModuleActive) {
			moduleContent.style.display = "flex"
			moduleContent.style.visibility = "visible"
			setTimeout(() => {
				moduleContent.classList.remove('module-contracted')
				moduleContent.classList.add('module-expanded')
				
			}, 0)
		}
		
		else {
			if (!firstLoad) {
				moduleContent.classList.remove('module-expanded')
				moduleContent.classList.add('module-contracted')
				setTimeout(() => {
					moduleContent.style.visibility = "hidden"
					moduleContent.style.display = "none"
				}, 300)
			}
			else setFirstLoad(false)
		}
		
	}, [isModuleActive])
	
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
				onClick={() => setIsModuleActive(!isModuleActive)}
				style={{backgroundColor: isModuleActive ? "#efefef" : ""}}>
				
				<div className={`module-plus-minus ${isModuleActive ? "plus-minus-rotated" : ""}`}>↓</div>
				
				<p className="moduleName">{module.moduleName}</p>
				
			</div>
			{/* End title section */}
			
			
			<div className="moduleContent module-contracted" id={module.moduleName}>
				
				{module.lessons.map((lesson, index) => 
					<Lesson lesson={lesson} lessonIndex={index} lessonsInCurrentModule={GetLessonNamesInModule()} moduleName={module.moduleName} key={lesson.lessonName} completed={JSON.stringify(progressArrayForThisModule).includes(lesson.lessonName)}/>
				)}
					
			</div>
			
		</div>
	)
}