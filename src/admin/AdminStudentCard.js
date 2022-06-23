import {useState, useEffect} from 'react'
import './AdminStudentCard.css'


export default function AdminStudentCard({lessonPlan, username}) {
	
	const [overallCompletion, setOverallCompletion] = useState(0)
	
	const [isCardExpanded, setIsCardExpanded] = useState(false)
	const [moduleProgress, setModuleProgress] = useState([])
	
	
	useEffect(() => {
		let totalLessons = 0
		let completedLessons = 0
		
		/* moduleProgress will look like: 
		[
			{
				moduleName: 'HTML',
				finished: ['Basic HTML', 'Intro to CSS', . . . ],
				unfinished: ['Box Model', 'Box Model Margins & Padding', . . . ],
				completionPercent: 0
			},
			. . . more modules
		]
		*/
		
		for (const [moduleIndex, module]  of lessonPlan.entries()) {
			
			moduleProgress.push({moduleName: module.moduleName, finished: [], unfinished: [], completion: 0})
			
			for (const lesson of module.lessons) {
				totalLessons++
				if (lesson.studentProgress.find(usernameAndCode => usernameAndCode.username === username && usernameAndCode.submittedCode !== "")) {
					completedLessons++
					moduleProgress[moduleIndex].finished.push(lesson.lessonName)	
				}
				else moduleProgress[moduleIndex].unfinished.push(lesson.lessonName) 
			}
			
			moduleProgress[moduleIndex].completionPercent = Math.round(100 * moduleProgress[moduleIndex].finished.length / (moduleProgress[moduleIndex].finished.length + moduleProgress[moduleIndex].unfinished.length))
			
		}
		
		setOverallCompletion(Math.round(100*(completedLessons/totalLessons)))
	}, [])
	
	return (
		<div className={isCardExpanded ? "adminCard adminCardSelected" : "adminCard"}>
			<div className="adminCardHeader" onClick={() => setIsCardExpanded(!isCardExpanded)}> {username} {overallCompletion}%</div>
			{isCardExpanded && <div className="adminModal" onClick={() => setIsCardExpanded(!isCardExpanded)}>
				<div className="adminModalContent">
					{moduleProgress.map(module => <div key={module.moduleName}>
											
							<p>{module.moduleName} {module.completionPercent}%</p>
							<div> Finished:
								{module.finished.map(lessonName => <span key={username + lessonName}>{lessonName}</span>)}
							</div>
							<div> Unfinished:
								{module.unfinished.map(lessonName => <span key={username + lessonName}>{lessonName}</span>)}
							</div>
						</div>
					) }
				</div>
			</div>
			}
		</div>
	)
}