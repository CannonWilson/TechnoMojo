import {useState} from 'react'
import AdminLessonSummary from './AdminLessonSummary.js'
import AdminStudentSummary from './AdminStudentSummary.js'
import './AdminModule.css'


export default function AdminModule({module, progressArrayForThisModule, from}) {
	
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
	
	return (
		<>
			<div className="adminModuleWrapper">
				<div className="adminModuleTitleWrapper" onClick={toggleModuleActive} style={{backgroundColor: moduleActive ? "#efefef" : ""}}>
					<div className={moduleActive ? "adminPlusMinusRotated adminModulePlusMinus" : "adminModulePlusMinus"}>↓</div>
					<p className="adminModuleName">{module.moduleName}</p>
				</div>
				
				{moduleActive && <div className= "adminModuleContentWrapper" style={moduleActive ? mountedStyle : unmountedStyle}>
					  <div className="adminModuleContent">
					  
						  {!from && module.lessons.map(lesson => 
							  <AdminLessonSummary lesson={lesson} key={lesson.lessonName} />
						  )}
						  
						  {from === "studentModal" && 
							  <AdminStudentSummary module={module} key={module.moduleName} />
						  }
						  
					  </div>
				</div>}

			</div>
		</>
	)
}