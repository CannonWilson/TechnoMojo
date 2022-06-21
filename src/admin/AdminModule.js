import {useState} from 'react'
import AdminLessonSummary from './AdminLessonSummary.js'
import './AdminModule.css'
import { Transition, animated } from 'react-spring'


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
				
				<Transition
					items={moduleActive}
					from={{ opacity: 0, height: 0}}
					enter={item => async (next, cancel) => {
						await next({ height: "auto" })
						await next({ opacity: 1 })
					  }}
					leave={item => async (next, cancel) => {
						await next({ opacity: 0 })
						await next({ height: 0 })
					  }}
					reverse={moduleActive}>
					{(styles, item) =>
					  item && <animated.div style={styles}className="moduleContentWrapper">
						  <div className="moduleContent">
						  
							  {module.lessons.map(lesson => 
								  <AdminLessonSummary lesson={lesson} key={lesson.lessonName} />
							  )}
							  
						  </div>
					  </animated.div>
					}
				  </Transition>
				

			</div>
		</>
	)
}
