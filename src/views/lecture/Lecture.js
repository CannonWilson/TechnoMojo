import { useSearchParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'
import './Lecture.css'
const lessonPlan = require("../../curriculum/lessonPlan.js")

export default function Lecture() {
	
	const navigate = useNavigate()
	
	const [successMessage, setSuccessMessage] = useState("Nice! You got it right, please move on to the next question.")
	const finishedQuizMessage = "Great job! You completed the quiz."
	const [isQuizComplete, setIsQuizComplete] = useState(false)
	let isCodeSubmitted = false
	
	const [showAnswer, setShowAnswer] = useState(false)
	
	/* The useSearchParams hook is used to get the value of 
	the request queries called moduleName and lessonName. They 
	are decoded and then used to lookup the correct video urls, 
	quiz info, etc. from /src/data/lessonPlan.js */
	
	const [searchParams, setSearchParams] = useSearchParams();
	const moduleName = decodeURIComponent(searchParams.get('moduleName'))
	const lessonName = decodeURIComponent(searchParams.get('lessonName'))
	
	const currentModule = lessonPlan.find(module => module.moduleName === moduleName)
	const currentLesson = currentModule.lessons.find(lesson => lesson.lessonName === lessonName)
	
	/* When the submit button is pressed, the user's input should be verified (the 
	current code only checks that the textarea shoudln't be empty). Then, the
	user's input is URL encoded and passed to the backend to be recorded 
	in the database. */
	const [submitErrorMessage, setSubmitErrorMessage] = useState("")
	
	async function submitButtonPressed() {
		
		const userCode = encodeURIComponent(document.getElementById('submissionTextArea').value)
		
		if (!isQuizComplete && userCode.length === 0) {
			setSubmitErrorMessage("You must type your code and complete the quiz before submitting.")
			return
		}
		else if (userCode.length === 0) {
			setSubmitErrorMessage("You must type your code before submitting.")
			return
		}
		else if (!isQuizComplete) {
			setSubmitErrorMessage("You must complete the quiz before submitting.")
			return
		}
		setSubmitErrorMessage("") // clear out the error message if everything is complete

		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(
				{
					moduleName: currentModule.moduleName, 
					lessonName: currentLesson.lessonName, 
					userCode: userCode
				})
		}
		const username = localStorage.getItem("username")
		if (!username) {
			setSubmitErrorMessage('You are not logged in. Please save your work by copying and pasting your code into some other application before returning to the home screen of this portal to sign in.')
			throw new Error('User is not logged in')
		}
		try {
			const response = await fetch('http://localhost:4000/api/updateProgress?username=' + username, requestOptions)
			// show the answer if successful
			if (response.ok) {
				setShowAnswer(true)
			}
		}
		catch(err) {
			console.error(err)
			setSubmitErrorMessage("Something went wrong on our end. Please grab an instructor and we'll take a look.")
		}
	}
	
	
	// function triggered when the button under the textarea is pressed
	function saveCodeButtonPressed() {
		// TODO: implement this function
	}
		
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [chosenChoiceIndex, setChosenChoiceIndex] = useState(null)
	const [questionIndexesAnsweredCorrectly, setQuestionIndexesAnsweredCorrectly] = useState([])
	const [currentQuestionAnsweredCorrectly, setCurrentQuestionAnsweredCorrectly] = useState(false)
	const [questionFeedback, setQuestionFeedback] = useState("")
	
	function choiceClicked(choiceNumber) {
		/* Only allow a new choice to be selected if the correct answer has not yet
		been submitted for the current question */
		if (!currentQuestionAnsweredCorrectly) { 
			setChosenChoiceIndex(choiceNumber - 1)
			document.querySelectorAll(".choice").forEach(choice => {
				choice.classList.remove('clickedChoice')
			})
			document.querySelector(".choice" + choiceNumber).classList.add('clickedChoice')
		}
	}
	
	
	/* The following hook checks if the user has completed the quiz
	whenever the length of the questionIndexesAnsweredCorrectly
	array changes */
	useEffect(() => {
		if (questionIndexesAnsweredCorrectly.length === currentLesson.quiz.length) {
			setIsQuizComplete(true)
			setSuccessMessage(finishedQuizMessage)
			setQuestionFeedback(finishedQuizMessage)
		}
	}, [questionIndexesAnsweredCorrectly])
	
	
	function submitChoiceButtonPressed() {
		
		console.log('submit choice button pressed')
		console.log("chosenChoiceIndex", chosenChoiceIndex)
		console.log('questionIndexesAnsweredCorrectly', questionIndexesAnsweredCorrectly)
		console.log('currentQuestionIndex', currentQuestionIndex)
		console.log('currentQuestionAnsweredCorrectly', currentQuestionAnsweredCorrectly)
		
		/* do nothing if the user has not clicked on an answer 
		choice or if the user has already submitted the correct
		answer for this question */
		if (chosenChoiceIndex === null || questionIndexesAnsweredCorrectly.includes(currentQuestionIndex)) return
		
		// correct answer chosen
		if (chosenChoiceIndex === currentLesson.quiz[currentQuestionIndex].correctAnswerIndex) {
			
			/* add the index of the current question to the array
			tracking correctly answered questions if that array 
			doesn't already hold that question index. This is to 
			avoid duplicate correct answers being recorded. */
			if (!questionIndexesAnsweredCorrectly.includes(currentQuestionIndex)) {
				setQuestionIndexesAnsweredCorrectly([...questionIndexesAnsweredCorrectly, currentQuestionIndex])
			}

			setQuestionFeedback(successMessage)
			setCurrentQuestionAnsweredCorrectly(true)
		}
		
		// incorrect answer chosen
		else {
			setQuestionFeedback("That is not correct, please try again.")
		}
	}
	
	/* Because changes to state variables in React don't happen immediately,
	the updates to the styling of the current question whenever one of the
	arrow keys is pressed must occur after the currentQuestionIndex value
	has finished updating */
	useEffect( () => {
		handleChoiceStylingOnCurrentQuestion()
	}, [currentQuestionIndex])
	
	function handleChoiceStylingOnCurrentQuestion() {
		/* Default behavior: clear out current styling like the
		user has never seen the question before */
		document.querySelectorAll(".choice").forEach(choice => {
			choice.classList.remove('clickedChoice')
		})
		setCurrentQuestionAnsweredCorrectly(false)
		setQuestionFeedback("")
		
		/* If the currently shown question has already been answered correctly:
		retrieve the correct answer, highlight the correct answer, and 
		prevent user interaction with choices */
		if (questionIndexesAnsweredCorrectly.includes(currentQuestionIndex)) {
			document.querySelector(".choice" + String(currentLesson.quiz[currentQuestionIndex].correctAnswerIndex + 1)).classList.add('clickedChoice')
			setCurrentQuestionAnsweredCorrectly(true)
			setQuestionFeedback(successMessage)
		}
	}
	
	
	function arrowPressed(increment) {
		let newIndex = (currentQuestionIndex + increment)
		if (newIndex < 0) newIndex = currentLesson.quiz.length - 1 // wrap around to the very last index if needed
		else newIndex = newIndex % currentLesson.quiz.length // wrap around to the first index if needed
		setCurrentQuestionIndex(newIndex)
		if (!questionIndexesAnsweredCorrectly.includes(newIndex)) {
			setChosenChoiceIndex(null)
		}
	}
	
	
	return (
		<>
			<div className="lecturePageWrapper">
				<div className="lecturePageContent">
					
					{/* Title section*/}
					<div>
						<h1>{currentLesson.lessonName}</h1>
						<p>{currentLesson.lessonDescription}</p>
					</div>
					
					
					{/* Intro video */}
					<div style={{padding:'56.25% 0 0 0',position:'relative'}}><iframe src={currentLesson.introVideoUrl} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} title="Strings"></iframe></div>
					
					{/* Exercise Section*/}
					<h2>Exercise</h2>
					<p>{currentLesson.exerciseDescription}</p>
					<iframe src={currentLesson.codeSandBoxUrl}
						 style={{width:'100%', height:'100vh', border:0, borderRadius: '4px', overflow: 'hidden'}}
						 title="brave-archimedes-uo2ucj"
						 allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
						 sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
					   ></iframe>
					
					{/* Submission section */}
					<h2>Submit</h2>
					<p>{currentLesson.submissionDescription}</p>
					<textarea id="submissionTextArea" />
					<div>
						<button onClick={saveCodeButtonPressed} className="saveCodeBtn">Save Code</button>
					</div>
					
					{/* Quiz section */}
					<h2>Quiz</h2>
					<p>Please take this short quiz to demonstrate your understanding of this lesson's content. All questions are multiple-choice, and you can submit answers as many times as you need without being penalized for incorrect choices. You must select the correct answer on every question before you can proceed.</p>
					<div className="quizWrapper">
					
						<div className="questionHeader">
							{currentLesson.quiz[currentQuestionIndex].question}
						</div>
						<div className="choice choice1" onClick={() => choiceClicked(1)}>
							{currentLesson.quiz[currentQuestionIndex].answerChoices[0]}
						</div>
						<div className="choice choice2" onClick={() => choiceClicked(2)}>
							{currentLesson.quiz[currentQuestionIndex].answerChoices[1]}
						</div>
						<div className="choice choice3" onClick={() => choiceClicked(3)}>
							{currentLesson.quiz[currentQuestionIndex].answerChoices[2]}
						</div>
						<div className="choice choice4" onClick={() => choiceClicked(4)}>
							{currentLesson.quiz[currentQuestionIndex].answerChoices[3]}
						</div>
						<div className="questionFeedback">
							{questionFeedback}
						</div>
						<div className="submitChoiceBtnWrapper">
							<button className="submitChoiceBtn" onClick={submitChoiceButtonPressed}>Save answer</button>
						</div>
						<div className="dots">
							{/* TODO: put dots here */}
						</div>
						<div className="quizLeftArrow">
							<svg onClick={() => arrowPressed(-1)} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M20 44 0 24 20 4 22.8 6.85 5.65 24 22.8 41.15Z"/></svg>
						</div>
						<div className="quizRightArrow">
							<svg onClick={() => arrowPressed(1)} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M15.2 43.9 12.4 41.05 29.55 23.9 12.4 6.75 15.2 3.9 35.2 23.9Z"/></svg>
						</div>
					</div>
					
					
					{/* Submit button */}
					<div className="submitSection">
						<p id="submitError">{submitErrorMessage}</p>
						<button className="lectureSubmitBtn" onClick={submitButtonPressed}>Submit</button>
					</div>
					
					{/* Answer section */}
					{showAnswer ? 
						<div>
								<h1>Awesome job!</h1>
								<p>You completed this lesson. The solution video is below. Please watch it and feel free to resubmit your code after watching.</p>
							
							
							{/* Intro video */}
							<div style={{padding:'56.25% 0 0 0',position:'relative'}}><iframe src={currentLesson.answerVideoUrl} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} title="Strings"></iframe></div>
						</div>
						: null}
					
				</div>
			</div>
		</>
	)
}