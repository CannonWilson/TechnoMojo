import {useState, useEffect} from 'react'

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
				unfinished: ['Box Model', 'Box Model Margins & Padding', . . . ]
			},
			. . . more modules
		]
		*/
		
		for (const [moduleIndex, module]  of lessonPlan.entries()) {
			
			moduleProgress.push({moduleName: module.moduleName, finished: [], unfinished: []})
			
			for (const lesson of module.lessons) {
				totalLessons++
				if (lesson.studentProgress.find(usernameAndCode => usernameAndCode.username === username && usernameAndCode.submittedCode !== "")) {
					completedLessons++
					moduleProgress[moduleIndex].finished.push(lesson.lessonName)	
				}
				else moduleProgress[moduleIndex].unfinished.push(lesson.lessonName) 
				
			}
		}
		
		setOverallCompletion(Math.round(100*(completedLessons/totalLessons)))
	}, [])
	
	return (
		<>
			<div onClick={() => setIsCardExpanded(!isCardExpanded)}> {username} {overallCompletion}%</div>
			{isCardExpanded && <div>
					{moduleProgress.map(module => <div key={module.moduleName}>
											
							<p>{module.moduleName} {Math.round(100 * module.finished.length / (module.finished.length + module.unfinished.length))}%</p>
							<div> Finished:
								{module.finished.map(lessonName => <span key={username + lessonName}>{lessonName}</span>)}
							</div>
							<div> Unfinished:
								{module.unfinished.map(lessonName => <span key={username + lessonName}>{lessonName}</span>)}
							</div>
						</div>
					) }
				</div>
			}
		</>
	)
}