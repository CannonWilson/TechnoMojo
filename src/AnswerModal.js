export default function AnswerModal({hideModalHelperFunction}) {
	return (
		<>
			<div>
				<h4>This is the Answer Modal</h4>
				<button onClick={hideModalHelperFunction}>Close</button>
			</div>
		</>
	)
}