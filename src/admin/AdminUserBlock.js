import {useEffect} from 'react'
import "./AdminUserBlock.css"

export default function AdminUserBlock({headerText, code}) {
	
	return (
		<>
			<div className="blockWrapper">
				<p className="blockHeader">{headerText}</p>
				<p className="blockCode">{decodeURIComponent(code)}</p>
			</div>
		</>
	)
}