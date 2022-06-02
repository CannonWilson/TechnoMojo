import {useEffect} from 'react'
import "./AdminUserBlock.css"

export default function AdminUserBlock({username, code}) {
	
	return (
		<>
			<div className="blockWrapper">
				<p className="blockUsername">{username}</p>
				<p className="blockCode">{decodeURIComponent(code)}</p>
			</div>
		</>
	)
}