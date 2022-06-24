import './Header.css'
import {Link} from 'react-router-dom'
import RobotLogo from '../images/robot_logo.jpg'

export default function Header({handleReload, leftText, rightText, leftLink, rightLink}) {
		
	if (handleReload) handleReload()
		
	return (
		<>
			<div className="header-wrapper">
				<div className="left-link-section">
					<Link className="left-link" to={leftLink}>{leftText}</Link>
				</div>
				<div className="logo-section">
					<img src={RobotLogo} className="robot-logo" />
					<p>TechnoMojo</p>
				</div>
				<div className="right-link-section">
					<Link className="right-link" to={rightLink} onClick={() => localStorage.setItem('reload', 'true')}>{rightText}</Link>
				</div>
			</div>
		</>
	)
}