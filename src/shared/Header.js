/* Currently, a lot of functionality of the Header
is only used in the Lecture view.

The Header component handles reloading the page in
the Lecture view in order to avoid infinite reloads 
while still updating the component's state to 
reflect the next lesson's data.

The header also shows text in the right link section 
(the name of the next lesson) only in the Lecture view. 
In this view, the right link text can exceed the desired width 
and cause undesirable wrapping if the lesson name is 
too long. Thus, if the screen width is too small, the 
right text is replaced with 'Next →' */


import './Header.css'
import {Link} from 'react-router-dom'
import RobotLogo from '../images/robot_logo.jpg'

export default function Header({handleReload, leftText, rightText, leftLink, rightLink}) {
	
	if (handleReload) handleReload()
	
	return (
		<div className="header-wrapper">
			<div className="left-link-section">
				<Link className="left-link" to={leftLink}>{leftText}</Link>
			</div>
			<div className="logo-section">
				<img src={RobotLogo} className="robot-logo" alt="TechnoMojo logo"/>
				<p className="logo-text">TechnoMojo</p>
			</div>
			<div className="right-link-section">
				<Link className="right-link" to={rightLink} onClick={() => localStorage.setItem('reload', 'true')}>
					{rightText && <span className="large-right-text">{rightText}</span>}
					{rightText && <span className="small-right-text">Next →</span>}
				</Link>
			</div>
		</div>
	)
}