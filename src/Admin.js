import {useState, useEffect} from 'react'


export default function Admin() {
	
	// want to construct an array that looks like this:
	/* array = [
		{
			moduleName: 'Intro JavaScript',
			lessons: [
				{
					lessonName: 'addEventListener',
					studentProgress: [
						{
							username: 'KincannonW',
							submittedCode: '<div>Hi</div>',
						},
						{
							username: 'IsabelleJ',
							submittedCode: ''
						},
						. . . more studentProgress entries
					]
				},
				{
					lessonName: 'console.log()',
					studentProgress: [
						{
							username: 'KincannonW',
							submittedCode: 'console.log("boop")',
						},
						{
							username: 'IsabelleJ',
							submittedCode: 'console.log("yeet")'
						},
						. . . more studentProgress entries
					]
				},
				. . . more lessons
			]
		},
		. . . more modules
	]
	*/
	
	
	
	
	// start by getting all of the progress arrays and corresponding usernames from backend
	useEffect( () => {
		
		async function retrieveStudentProgress() {
			
			const response = await fetch('http://localhost:43023/api/allStudentProgress')
			const json = await response.json()
			console.log('json', json)
			
		}
		
		retrieveStudentProgress()
		
	}, [] ) 

	
	
	
	
	return(
		<>
			<div>Admin view</div>
		</>
	)
}