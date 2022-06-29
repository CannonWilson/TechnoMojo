import Header from '../../shared/Header.js'
import {Link} from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
	
	return (
		<>
		
			{/* Begin header */}
			<Header leftText="← Sign in" rightText="" leftLink="/" rightLink="#"/>
			{/* End header */}
			
			
			{/* Begin error message */}
			<div className="page-wrapper-404">
				<h1 className="header-404">404</h1>
				<h4>The requested URL was not found on our server</h4>
				<Link to="/">Click here to get back on track</Link>
			</div>
		</>
	)
}