import {useState, useEffect} from 'react'
import Lesson from './Lesson.js'
import './Module.css'


export default function Module({module, progressArrayForThisModule}) {
	
	const [isModuleActive, setIsModuleActive] = useState(false)
	
	
	/* The progress array is converted into a string here 
	in order to make it easy to check through the progress
	array and see if a given lesson is completed. */
	const [stringifiedProgress, setStringifiedProgress] = useState("")
	
	useEffect(() => {
		if (progressArrayForThisModule) setStringifiedProgress(JSON.stringify(progressArrayForThisModule))
	}, [progressArrayForThisModule])
	
	
	/* The following style objects are used to control  
	expand and contract animations written in './Module.css' 
	whenever the module contents are shown/hidden.
	Transitions do not trigger on the first load. */
	const [firstLoad, setFirstLoad] = useState(true)
	
	useEffect(() => {
		
		const moduleContent = document.getElementById(module.moduleName + "Content")
		
		if (isModuleActive) {
			moduleContent.style.display = "flex"
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
					moduleContent.style.display = "none"
				}, 300)
			}
			else setFirstLoad(false)
		}
		
	}, [isModuleActive])
	
	
	/* Returns a string of all the lessons in the current  
	module separated by dashes. This string gets passed 
	into the URL whenever a lesson is clicked in Lesson.js */
	function GetLessonNamesInModule() {
		let lessonNamesStr = ""
		for (const lesson of module.lessons) {
			lessonNamesStr += lesson.lessonName + "-"
		}
		return lessonNamesStr.slice(0, -1)
	}
	
	
	return (
		<div className="module-wrapper">
		
			{/* Begin title section */}
			<div className="module-title-wrapper" 
				onClick={() => setIsModuleActive(!isModuleActive)}
				style={{backgroundColor: isModuleActive ? "#efefef" : ""}}>
				
				<div className={`module-plus-minus ${isModuleActive ? "plus-minus-rotated" : ""}`}>↓</div>
				
				<p className="module-name">{module.moduleName}</p>
				
			</div>
			{/* End title section */}
			
			
			{/* Begin module content (lessons) */}
			<div className="module-content module-contracted" id={module.moduleName + "Content"}>
				
				{module.lessons.map((lesson, index) => 
					<Lesson lesson={lesson} lessonIndex={index} lessonsInCurrentModule={GetLessonNamesInModule()} moduleName={module.moduleName} key={lesson.lessonName} completed={stringifiedProgress.includes(lesson.lessonName)}/>
				)}
					
			</div>
			{/* End module content (lessons) */}
			
		</div>
	)
}