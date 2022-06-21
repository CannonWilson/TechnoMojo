import './Header.css'
import {Link} from 'react-router-dom'
import RobotLogo from '../images/robot_logo.jpg'

export default function Header({leftText, rightText, leftLink, rightLink}) {
	return (
		<>
			<div className="header-wrapper">
				<Link className="left-link" to={leftLink}>{leftText}</Link>
				<div className="logo-section">
					<img src={RobotLogo} className="robot-logo" />
					<p>TechnoMojo</p>
				</div>
				<Link className="right-link" to={rightLink}>{rightText}</Link>
			</div>
		</>
	)
}