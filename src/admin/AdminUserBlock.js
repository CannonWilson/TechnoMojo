import "./AdminUserBlock.css"

export default function AdminUserBlock({headerText, code}) {
	
	return (
		<div className="block-wrapper">
			<p className="block-header">{headerText}</p>
			<p className="block-code">{decodeURIComponent(code)}</p>
		</div>
	)
}