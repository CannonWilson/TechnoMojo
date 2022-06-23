import {useState, useEffect} from 'react'
import './AdminStudentCard.css'
import AdminModule from './AdminModule.js'


export default function AdminStudentCard({lessonPlan, username}) {
	
	const [overallCompletion, setOverallCompletion] = useState(0)
	
	const [isCardExpanded, setIsCardExpanded] = useState(false)
	const [moduleProgress, setModuleProgress] = useState([])
	
	
	useEffect(() => {
		let totalLessons = 0
		let completedLessons = 0
		
		/* moduleProgress will look like this for each student: 
		[
			{
				moduleName: 'HTML',
				lessons: [
					{
						lessonName: 'Basic HTML',
						submittedCode: ''
					},
					{
						lessonName: 'Intro to CSS', 
						submittedCode: ''
					},
					. . . 
				],
				completionPercent: 0
			},
			. . . more modules
		]
		*/
				
		for (const [moduleIndex, module]  of lessonPlan.entries()) {
			
			moduleProgress.push({moduleName: module.moduleName, lessons: [], completionPercent: 0})
			
			for (const lesson of module.lessons) {
				totalLessons++
				const foundCompletedLesson = lesson.studentProgress.find(usernameAndCode => usernameAndCode.username === username && usernameAndCode.submittedCode !== "")
				if (foundCompletedLesson) {
					completedLessons++
					moduleProgress[moduleIndex].lessons.push({lessonName: lesson.lessonName, submittedCode: foundCompletedLesson.submittedCode})	
				}
				else moduleProgress[moduleIndex].lessons.push({lessonName: lesson.lessonName, submittedCode: ""}) 
			}
			
			const numFinishedLessons = moduleProgress[moduleIndex].lessons.filter(lesson => lesson.submittedCode !== "").length
			const numUnfinishedLessons = moduleProgress[moduleIndex].lessons.filter(lesson => lesson.submittedCode === "").length
			
			moduleProgress[moduleIndex].completionPercent = Math.round(100 * numFinishedLessons / (numFinishedLessons + numUnfinishedLessons))
			
		}
		
		setOverallCompletion(Math.round(100*(completedLessons/totalLessons)))
	}, [])
	
	return (
		<div className={isCardExpanded ? "adminCard adminCardSelected" : "adminCard"}>
			<div className="adminCardHeader" onClick={() => setIsCardExpanded(true)}> {username} - {overallCompletion}%</div>
			{isCardExpanded && <div className="adminModal" onClick={() => setIsCardExpanded(false)}>
				<div className="adminModalContent" onClick={(event) => event.stopPropagation()} >
					<div className="adminModalHeader">
						<div className="adminModalClose" >
							<button className="adminModalCloseBtn" onClick={() => setIsCardExpanded(false)}>X</button>
						</div>
						<div className="adminModalUserInfo">
							<h2 className="adminModalUsername">{username}</h2>
							<h4 className="adminModalCompletion">Overall completion: {overallCompletion}%</h4>
						</div>
					</div>
					<div className="accordian">
						{moduleProgress.map(module => 
							<AdminModule from="studentModal" module={module} key={module.moduleName} />
						)}
					</div>
					

					{/*
					{moduleProgress.map(module => <div key={module.moduleName}>
							<p className="adminModalModuleHeader">{module.moduleName} - {module.completionPercent}%</p>
							<div className="adminModalFinishedSection"> <span style={{textDecoration: 'underline'}}>Finished:</span>
								{module.finished.map(lessonName => <span className="adminModalLesson" key={username + lessonName}>{lessonName}</span>)}
							</div>
							<div className="adminModalUnfinishedSection"> <span style={{textDecoration: 'underline'}}>Unfinished:</span>
								{module.unfinished.map(lessonName => <span className="adminModalLesson" key={username + lessonName}>{lessonName}</span>)}
							</div>
							<hr></hr>
						</div>
					) }
					*/}
				</div>
			</div>
			}
		</div>
	)
}